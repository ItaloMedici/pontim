"use server";

import { db } from "@/lib/db";

export async function getPlans() {
  return db.plan.findMany();
}
