-- AlterTable
ALTER TABLE "Deck" ADD COLUMN     "cutomRoomId" TEXT;

-- CreateIndex
CREATE INDEX "by_custom_room" ON "Deck"("cutomRoomId");

-- CreateIndex
CREATE INDEX "by_name" ON "Deck"("name");
