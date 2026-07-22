import { supabaseAdmin } from "@/lib/supabase-admin";
import { NextResponse } from "next/server";

const ALLOWED_TABLES = ["products", "categories", "subcategories"];

export async function POST(request) {
  try {
    const { table, id } = await request.json();

    if (!table || !id || !ALLOWED_TABLES.includes(table)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    await supabaseAdmin.rpc("increment_view_count", {
      table_name: table,
      row_id: id,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
