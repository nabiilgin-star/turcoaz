import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { removeDiacritics } from "@/app/lib/stringUtils";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  if (query.length < 1) {
    return NextResponse.json([]);
  }

  try {
    
    const { data: categories, error: catError } = await supabaseAdmin
      .from("categories")
      .select("id, slug");
    
    if (catError) console.error("Search API: Cat Fetch Error:", catError);

    
    const { data: allSubcategories, error: subError } = await supabaseAdmin
      .from("subcategories")
      .select("id, slug, parent_id, category_id");

    if (subError) console.error("Search API: Sub Fetch Error:", subError);

    const subMap = {};
    allSubcategories?.forEach((sub) => {
      subMap[sub.id] = sub;
    });

    
    
    
    
    const { data: products, error } = await supabaseAdmin
      .from("products")
      .select("id, title, slug, image, category_id, subcategory_id, categories(slug)");

    if (error) {
      console.error("Search API Database Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const cleanQuery = removeDiacritics(query.toLowerCase());

    
    const getSubPath = (subId) => {
      let path = "";
      let current = subMap[subId];
      while (current) {
        path = current.slug + (path ? "/" + path : "");
        if (current.parent_id) {
          current = subMap[current.parent_id];
        } else {
          const cat = categories?.find((c) => c.id === current.category_id);
          if (cat) {
            path = cat.slug + "/" + path;
          }
          break;
        }
      }
      return path;
    };

    const optimizedResults =
      products
        ?.filter((p) => {
          const cleanTitle = removeDiacritics(p.title.toLowerCase());
          return cleanTitle.includes(cleanQuery) || p.title.toLowerCase().includes(query.toLowerCase());
        })
        .slice(0, 8)
        .map((p) => {
          let fullPath = "";
          if (p.subcategory_id) {
            fullPath = getSubPath(p.subcategory_id);
          } else if (p.category_id && p.categories?.slug) {
            fullPath = p.categories.slug;
          }
          return {
            id: p.id,
            title: p.title,
            image: p.image,
            link: `/categorii/${fullPath ? fullPath + "/" : ""}${p.slug}`,
          };
        }) || [];

    return NextResponse.json(optimizedResults);
  } catch (err) {
    console.error("Search API Internal Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
