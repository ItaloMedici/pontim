#!/bin/bash

# Script para criação automática de tags semânticas
# Analisa commits desde a última tag para determinar o tipo de bump (major, minor, patch)

set -e

echo "🏷️ Starting semantic tag creation..."

# Configura git
git config user.name "github-actions[bot]"
git config user.email "github-actions[bot]@users.noreply.github.com"

# Busca a última tag semântica
LAST_TAG=$(git tag -l "v*.*.*" | sort -V | tail -n1)

if [ -z "$LAST_TAG" ]; then
    # Primeira tag
    NEW_VERSION="1.0.0"
    echo "📝 No previous tags found. Starting with v1.0.0"
else
    echo "📝 Last tag: $LAST_TAG"
    
    # Remove o 'v' prefix para trabalhar com a versão
    LAST_VERSION=${LAST_TAG#v}
    
    # Extrai major, minor, patch
    IFS='.' read -ra VERSION_PARTS <<< "$LAST_VERSION"
    MAJOR=${VERSION_PARTS[0]}
    MINOR=${VERSION_PARTS[1]}
    PATCH=${VERSION_PARTS[2]}
    
    # Analisa commits desde a última tag para determinar o tipo de bump
    COMMITS_SINCE_TAG=$(git log ${LAST_TAG}..HEAD --oneline)
    
    # Verifica se há breaking changes (MAJOR)
    if echo "$COMMITS_SINCE_TAG" | grep -qiE "(breaking change|BREAKING CHANGE|[a-z]+(\([^)]*\))?!:)"; then
        NEW_MAJOR=$((MAJOR + 1))
        NEW_VERSION="${NEW_MAJOR}.0.0"
        echo "🔥 Breaking changes detected. Bumping MAJOR version."
    # Verifica se há features (MINOR)
    elif echo "$COMMITS_SINCE_TAG" | grep -qiE "(feat|feature|add|new)(\([^)]*\))?:"; then
        NEW_MINOR=$((MINOR + 1))
        NEW_VERSION="${MAJOR}.${NEW_MINOR}.0"
        echo "✨ Features detected. Bumping MINOR version."
    # Caso contrário, incrementa PATCH
    else
        NEW_PATCH=$((PATCH + 1))
        NEW_VERSION="${MAJOR}.${MINOR}.${NEW_PATCH}"
        echo "🐛 Patches/fixes detected. Bumping PATCH version."
    fi
fi

TAG="v${NEW_VERSION}"

echo "📝 Commit analysis since ${LAST_TAG:-'initial commit'}:"
if [ ! -z "$LAST_TAG" ]; then
    git log ${LAST_TAG}..HEAD --oneline | head -10
else
    git log --oneline | head -10
fi

echo "🏷️ Creating release tag: $TAG"

# Atualiza package.json com a nova versão
npm version $NEW_VERSION --no-git-tag-version

# Atualiza package-lock.json
npm install --no-save

# Commit da mudança no package.json e package-lock.json
git add package.json package-lock.json
git commit -m "chore: bump version to $NEW_VERSION [skip ci]"

# Cria a tag com changelog
if [ ! -z "$LAST_TAG" ]; then
    CHANGELOG=$(git log ${LAST_TAG}..HEAD --pretty=format:"- %s" | head -20)
else
    CHANGELOG=$(git log --pretty=format:"- %s" | head -10)
fi

git tag -a "$TAG" -m "Release $TAG

Changes since ${LAST_TAG:-'initial commit'}:
$CHANGELOG"

# Push das mudanças e tag
git push origin main
git push origin "$TAG"

# Define outputs para o GitHub Actions
echo "tag=$TAG" >> $GITHUB_OUTPUT
echo "version=$NEW_VERSION" >> $GITHUB_OUTPUT

echo "✅ Tag created successfully: $TAG"
echo "📦 Version: $NEW_VERSION"
