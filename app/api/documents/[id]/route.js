import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;

  
  const { data: doc, error } = await supabase
    .from("product_documents")
    .select("name, file_url")
    .eq("id", id)
    .single();

  if (error || !doc) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  
  const response = await fetch(doc.file_url);

  if (!response.ok) {
    return NextResponse.json({ error: "File not available" }, { status: 502 });
  }

  const blob = await response.blob();

  
  const ext = doc.file_url.split(".").pop()?.split("?")[0] || "pdf";
  const filename = `${doc.name}.${ext}`;

  return new NextResponse(blob, {
    headers: {
      "Content-Type":
        response.headers.get("Content-Type") || "application/octet-stream",
      "Content-Disposition": `inline; filename="${filename}"`,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
