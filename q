[1mdiff --git a/app/categorii/[...slug]/ProductView.js b/app/categorii/[...slug]/ProductView.js[m
[1mindex a27e303..06c7ccc 100644[m
[1m--- a/app/categorii/[...slug]/ProductView.js[m
[1m+++ b/app/categorii/[...slug]/ProductView.js[m
[36m@@ -227,9 +227,16 @@[m [mexport default function ProductView({ product }) {[m
                       <h3 style={{ fontSize: "1.3rem", fontWeight: "600", color: "#222", marginBottom: "8px" }}>[m
                         {item.title}[m
                       </h3>[m
[31m-                      <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: "1.6", margin: 0, whiteSpace: "pre-line" }}>[m
[31m-                        {item.description}[m
[31m-                      </p>[m
[32m+[m[32m                      {/<[a-z][\s\S]*>/i.test(item.description || "") ? ([m
[32m+[m[32m                        <div[m
[32m+[m[32m                          style={{ fontSize: "0.9rem", color: "#555", lineHeight: "1.6", margin: 0 }}[m
[32m+[m[32m                          dangerouslySetInnerHTML={{ __html: item.description }}[m
[32m+[m[32m                        />[m
[32m+[m[32m                      ) : ([m
[32m+[m[32m                        <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: "1.6", margin: 0, whiteSpace: "pre-line" }}>[m
[32m+[m[32m                          {item.description}[m
[32m+[m[32m                        </p>[m
[32m+[m[32m                      )}[m
                     </div>[m
                     {item.pdfUrl && ([m
                       <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer" style={buttonStyle}>[m
