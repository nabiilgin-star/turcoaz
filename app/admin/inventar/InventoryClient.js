"use client";

import React from "react";
import { useState, useEffect, useTransition, useRef } from "react";
import {
  Plus,
  Edit,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronRight,
  Search,
  CheckSquare,
  Square,
  FolderInput,
} from "lucide-react";
import toast from "react-hot-toast";
import tableStyles from "@/app/components/admin/admin-table.module.css";
import pageStyles from "@/app/admin/admin-page.module.css";
import Modal from "@/app/components/admin/Modal";
import ConfirmModal from "@/app/components/admin/ConfirmModal";
import CategoryForm from "@/app/components/admin/CategoryForm";
import SubcategoryForm from "@/app/components/admin/SubcategoryForm";
import { translateError } from "@/app/lib/errorUtils";
import { removeDiacritics } from "@/app/lib/stringUtils";
import {
  deleteCategory,
  createCategory,
  updateCategory,
  updateCategoryOrder,
} from "@/app/actions/categories";
import {
  deleteSubcategory,
  createSubcategory,
  updateSubcategory,
  updateSubcategoryOrder,
} from "@/app/actions/subcategories";
import {
  deleteProduct,
  createProduct,
  updateProduct,
  updateProductOrder,
  moveProduct,
} from "@/app/actions/products";
import ProductForm from "@/app/components/admin/ProductForm";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";





function SortableRow({
  id,
  children,
  style: extraStyle,
  className,
  hideDragHandle = false,
  isSelectMode = false,
  isSelected = false,
  onSelectToggle,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : "auto",
    position: "relative",
    opacity: isDragging ? 0.6 : 1,
    ...extraStyle,
  };

  return (
    <tr ref={setNodeRef} style={style} className={className}>
      <td
        className={tableStyles.tdOrd}
        style={{ cursor: hideDragHandle && !isSelectMode ? "default" : "grab" }}
      >
        {isSelectMode ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (onSelectToggle) onSelectToggle(id);
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              color: isSelected ? "#3b82f6" : "#9ca3af",
            }}
          >
            {isSelected ? <CheckSquare size={18} /> : <Square size={18} />}
          </button>
        ) : !hideDragHandle ? (
          <button
            {...attributes}
            {...listeners}
            className={tableStyles.dragHandle}
          >
            <GripVertical size={16} />
          </button>
        ) : null}
      </td>
      {children}
    </tr>
  );
}





function TypePill({ type }) {
  const labels = {
    cat: "CAT",
    sub: "SUB",
    prod: "PROD",
  };
  return (
    <span
      style={{
        fontSize: "0.6rem",
        fontWeight: 600,
        padding: "0.1rem 0.5rem",
        borderRadius: "999px",
        backgroundColor: "#f3f4f6", 
        color: "#6b7280", 
        border: "1px solid #e5e7eb", 
        marginLeft: "0.5rem",
        display: "inline-flex",
        alignItems: "center",
        lineHeight: 1,
        letterSpacing: "0.025em",
      }}
    >
      {labels[type]}
    </span>
  );
}

function ProductLevel({
  products,
  subId,
  level = 0,
  handleProductDragEnd,
  handleEditProduct,
  handleDeleteProduct,
  sensors,
  isSelectMode = false,
  selectedProductIds = [],
  toggleProductSelection,
  onImageClick,
}) {
  const paddingLeft = `${level * 1.25 + 1.5}rem`; 
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleProductDragEnd(subId)}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          borderLeft: "2px solid #f3f4f6",
        }}
      >
        <tbody>
          <SortableContext
            items={products.map((p) => p.id)}
            strategy={verticalListSortingStrategy}
          >
            {products.map((product) => (
              <SortableRow
                key={product.id}
                id={product.id}
                className={tableStyles.tr}
                style={{ background: "#fff" }}
                hideDragHandle={products.length <= 1}
                isSelectMode={isSelectMode}
                isSelected={selectedProductIds.includes(product.id)}
                onSelectToggle={toggleProductSelection}
              >
                <td className={tableStyles.tdImage}>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      onClick={() => onImageClick?.(product.image)}
                      className={tableStyles.image}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <div
                      className={tableStyles.noImage}
                      style={{ width: 32, height: 32, fontSize: "0.6rem" }}
                    >
                      —
                    </div>
                  )}
                </td>
                <td className={tableStyles.tdPrimary}>
                  <span
                    style={{
                      paddingLeft,
                      fontWeight: 400,
                      color: "#6b7280",
                      fontSize: "0.9rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {product.title}
                    <TypePill type="prod" />
                  </span>
                </td>
                <td className={tableStyles.tdActions}>
                  {!isSelectMode && (
                    <div className={tableStyles.actionsContainer}>
                      <button
                        onClick={() => handleEditProduct(product)}
                        className={tableStyles.actionButton}
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className={tableStyles.deleteButton}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </td>
              </SortableRow>
            ))}
          </SortableContext>
        </tbody>
      </table>
    </DndContext>
  );
}

function SubcategoryNode({
  sub,
  level = 0,
  expandedSubs,
  toggleSubExpand,
  handleOpenUnifiedAdd,
  handleEditSub,
  handleDeleteSub,
  sensors,
  handleSubDragEnd,
  handleProductDragEnd,
  handleEditProduct,
  handleDeleteProduct,
  hideDragHandle = false,
  isSelectMode = false,
  selectedProductIds = [],
  toggleProductSelection,
  onImageClick,
}) {
  const isExp = expandedSubs[sub.id];
  const subs = sub.subcategories || [];
  const prods = sub.products || [];
  const paddingLeft = `${level * 1.25}rem`;

  return (
    <React.Fragment>
      <SortableRow
        id={sub.id}
        className={tableStyles.tr}
        style={{ background: "#fafbfc" }}
        hideDragHandle={hideDragHandle}
      >
        <td className={tableStyles.tdImage}>
          {sub.image ? (
            <img
              src={sub.image}
              alt={sub.name}
              onClick={() => onImageClick?.(sub.image)}
              className={tableStyles.image}
              style={{
                width: 32,
                height: 32,
                borderRadius: "4px",
                cursor: "pointer",
              }}
            />
          ) : (
            <div
              className={tableStyles.noImage}
              style={{ width: 32, height: 32, fontSize: "0.6rem" }}
            >
              —
            </div>
          )}
        </td>
        <td className={tableStyles.tdPrimary}>
          <span
            style={{
              paddingLeft,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontWeight: 400,
              color: "#374151",
            }}
          >
            <button
              onClick={() => toggleSubExpand(sub.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "inline-flex",
                alignItems: "center",
                color: "#9ca3af",
              }}
            >
              {isExp ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
            {sub.name}
            <TypePill type="sub" />
          </span>
        </td>
        <td className={tableStyles.tdActions}>
          {!isSelectMode && (
            <div className={tableStyles.actionsContainer}>
              <button
                onClick={() => handleOpenUnifiedAdd(sub)}
                title="Adaugă"
                className={tableStyles.actionButton}
                style={{ color: "#10b981" }}
              >
                <Plus className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleEditSub(sub)}
                className={tableStyles.actionButton}
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDeleteSub(sub.id)}
                className={tableStyles.deleteButton}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </td>
      </SortableRow>

      {isExp && (
        <tr>
          <td colSpan={4} style={{ padding: 0, border: "none" }}>
            {subs.length > 0 && (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleSubDragEnd(sub.id)}
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    borderLeft: "2px solid #f3f4f6",
                  }}
                >
                  <tbody>
                    <SortableContext
                      items={subs.map((s) => s.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {subs.map((s) => (
                        <SubcategoryNode
                          key={s.id}
                          sub={s}
                          level={level + 1}
                          expandedSubs={expandedSubs}
                          toggleSubExpand={toggleSubExpand}
                          handleOpenUnifiedAdd={handleOpenUnifiedAdd}
                          handleEditSub={handleEditSub}
                          handleDeleteSub={handleDeleteSub}
                          sensors={sensors}
                          handleSubDragEnd={handleSubDragEnd}
                          handleProductDragEnd={handleProductDragEnd}
                          handleEditProduct={handleEditProduct}
                          handleDeleteProduct={handleDeleteProduct}
                          hideDragHandle={subs.length <= 1}
                          isSelectMode={isSelectMode}
                          selectedProductIds={selectedProductIds}
                          toggleProductSelection={toggleProductSelection}
                          onImageClick={onImageClick}
                        />
                      ))}
                    </SortableContext>
                  </tbody>
                </table>
              </DndContext>
            )}
            {prods.length > 0 && (
              <ProductLevel
                products={prods}
                subId={sub.id}
                level={level + 1}
                handleProductDragEnd={handleProductDragEnd}
                handleEditProduct={handleEditProduct}
                handleDeleteProduct={handleDeleteProduct}
                sensors={sensors}
                isSelectMode={isSelectMode}
                selectedProductIds={selectedProductIds}
                toggleProductSelection={toggleProductSelection}
                onImageClick={onImageClick}
              />
            )}
          </td>
        </tr>
      )}
    </React.Fragment>
  );
}

function CategoryNode({
  category,
  expanded,
  expandedSubs,
  toggleExpand,
  toggleSubExpand,
  handleOpenCreateSub,
  handleEditCat,
  handleDeleteCat,
  sensors,
  handleSubDragEnd,
  handleProductDragEnd,
  handleOpenUnifiedAdd,
  handleEditSub,
  handleDeleteSub,
  handleEditProduct,
  handleDeleteProduct,
  hideDragHandle = false,
  isSelectMode = false,
  selectedProductIds = [],
  toggleProductSelection,
  onImageClick,
}) {
  const isExp = expanded[category.id];
  const subs = category.subcategories || [];

  return (
    <React.Fragment>
      <SortableRow
        id={category.id}
        className={tableStyles.tr}
        hideDragHandle={hideDragHandle}
      >
        <td className={tableStyles.tdImage}>
          {category.image ? (
            <img
              src={category.image}
              alt={category.name}
              onClick={() => onImageClick?.(category.image)}
              className={tableStyles.image}
              style={{ width: 32, height: 32, cursor: "pointer" }}
            />
          ) : (
            <div
              className={tableStyles.noImage}
              style={{ width: 32, height: 32, fontSize: "0.6rem" }}
            >
              —
            </div>
          )}
        </td>
        <td className={tableStyles.tdPrimary}>
          <button
            onClick={() => toggleExpand(category.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: 0,
              font: "inherit",
              fontWeight: 600,
              color: "#111827",
            }}
          >
            {isExp ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            {category.name}
            <TypePill type="cat" />
          </button>
        </td>
        <td className={tableStyles.tdActions}>
          {!isSelectMode && (
            <div className={tableStyles.actionsContainer}>
              {}
              <button
                onClick={() => handleOpenUnifiedAdd(category)}
                title="Adaugă"
                className={tableStyles.actionButton}
                style={{ color: "#10b981" }}
              >
                <Plus className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleEditCat(category)}
                className={tableStyles.actionButton}
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDeleteCat(category.id)}
                className={tableStyles.deleteButton}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </td>
      </SortableRow>

      {isExp && (
        <tr style={{ padding: 0, background: "#fafbfc" }}>
          <td colSpan={4} style={{ padding: 0, border: "none" }}>
            {subs.length > 0 && (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleSubDragEnd(category.id, true)}
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
              >
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <tbody>
                    <SortableContext
                      items={subs.map((s) => s.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {subs.map((sub) => (
                        <SubcategoryNode
                          key={sub.id}
                          sub={sub}
                          level={1}
                          expandedSubs={expandedSubs}
                          toggleSubExpand={toggleSubExpand}
                          handleOpenUnifiedAdd={handleOpenUnifiedAdd}
                          handleEditSub={handleEditSub}
                          handleDeleteSub={handleDeleteSub}
                          sensors={sensors}
                          handleSubDragEnd={handleSubDragEnd}
                          handleProductDragEnd={handleProductDragEnd}
                          handleEditProduct={handleEditProduct}
                          handleDeleteProduct={handleDeleteProduct}
                          isSelectMode={isSelectMode}
                          selectedProductIds={selectedProductIds}
                          toggleProductSelection={toggleProductSelection}
                          onImageClick={onImageClick}
                        />
                      ))}
                    </SortableContext>
                  </tbody>
                </table>
              </DndContext>
            )}
            {category.products && category.products.length > 0 && (
              <ProductLevel
                products={category.products}
                subId={category.id} 
                level={1}
                handleProductDragEnd={handleProductDragEnd}
                handleEditProduct={handleEditProduct}
                handleDeleteProduct={handleDeleteProduct}
                sensors={sensors}
                isSelectMode={isSelectMode}
                selectedProductIds={selectedProductIds}
                toggleProductSelection={toggleProductSelection}
                onImageClick={onImageClick}
              />
            )}
          </td>
        </tr>
      )}
    </React.Fragment>
  );
}





export default function InventoryClient({ initialCategories }) {
  const [categories, setCategories] = useState(initialCategories);
  const [expanded, setExpanded] = useState({});
  const [expandedSubs, setExpandedSubs] = useState({});
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [hasChanges, setHasChanges] = useState(false);

  
  const [catModalOpen, setCatModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [subModalOpen, setSubModalOpen] = useState(false);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [preselectedCategoryId, setPreselectedCategoryId] = useState(null);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [preselectedSubcategoryId, setPreselectedSubcategoryId] =
    useState(null);

  
  const [unifiedAddModalOpen, setUnifiedAddModalOpen] = useState(false);
  const [unifiedAddTarget, setUnifiedAddTarget] = useState(null);
  const [activeTab, setActiveTab] = useState("product");

  
  const [moveProductModalOpen, setMoveProductModalOpen] = useState(false);
  const [moveTargetParentId, setMoveTargetParentId] = useState("");
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState("");

  const handleOpenLightbox = (url) => {
    setActiveImage(url);
    setLightboxOpen(true);
  };

  
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleExpandAll = () => {
    const allCatIds = {};
    const allSubIds = {};
    const traverse = (subs) => {
      subs.forEach((s) => {
        allSubIds[s.id] = true;
        if (s.subcategories) traverse(s.subcategories);
      });
    };
    categories.forEach((c) => {
      allCatIds[c.id] = true;
      if (c.subcategories) traverse(c.subcategories);
    });
    setExpanded(allCatIds);
    setExpandedSubs(allSubIds);
  };

  const handleCollapseAll = () => {
    setExpanded({});
    setExpandedSubs({});
  };

  const toggleProductSelection = (id) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  useEffect(() => setMounted(true), []);
  useEffect(() => setCategories(initialCategories), [initialCategories]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSubExpand = (id) => {
    setExpandedSubs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  
  const updateSubcategoriesRecursive = (subs, targetId, updateFn) => {
    return subs.map((s) => {
      if (s.id === targetId) return updateFn(s);
      if (s.subcategories?.length > 0) {
        return {
          ...s,
          subcategories: updateSubcategoriesRecursive(
            s.subcategories,
            targetId,
            updateFn,
          ),
        };
      }
      return s;
    });
  };

  const deleteSubcategoryRecursive = (subs, targetId) => {
    return subs
      .filter((s) => s.id !== targetId)
      .map((s) => ({
        ...s,
        subcategories: s.subcategories
          ? deleteSubcategoryRecursive(s.subcategories, targetId)
          : [],
      }));
  };

  const deleteProductRecursive = (subs, targetId) => {
    return subs.map((s) => ({
      ...s,
      products: (s.products || []).filter((p) => p.id !== targetId),
      subcategories: s.subcategories
        ? deleteProductRecursive(s.subcategories, targetId)
        : [],
    }));
  };

  
  const handleCategoryDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = categories.findIndex((c) => c.id === active.id);
      const newIndex = categories.findIndex((c) => c.id === over.id);
      const newItems = arrayMove(categories, oldIndex, newIndex);
      setCategories(newItems);
      setHasChanges(true);
    }
  };

  
  const handleSubDragEnd =
    (parentId, isCategory = false) =>
    (event) => {
      const { active, over } = event;
      if (active.id !== over?.id) {
        setCategories((prev) => {
          if (isCategory) {
            return prev.map((cat) => {
              if (cat.id !== parentId) return cat;
              const subs = cat.subcategories || [];
              const oldIdx = subs.findIndex((s) => s.id === active.id);
              const newIdx = subs.findIndex((s) => s.id === over.id);
              if (oldIdx < 0 || newIdx < 0) return cat;
              const newSubs = arrayMove(subs, oldIdx, newIdx);
              return { ...cat, subcategories: newSubs };
            });
          } else {
            return prev.map((cat) => ({
              ...cat,
              subcategories: updateSubcategoriesRecursive(
                cat.subcategories || [],
                parentId,
                (sub) => {
                  const subs = sub.subcategories || [];
                  const oldIdx = subs.findIndex((s) => s.id === active.id);
                  const newIdx = subs.findIndex((s) => s.id === over.id);
                  if (oldIdx < 0 || newIdx < 0) return sub;
                  return {
                    ...sub,
                    subcategories: arrayMove(subs, oldIdx, newIdx),
                  };
                },
              ),
            }));
          }
        });
        setHasChanges(true);
      }
    };

  
  const handleProductDragEnd = (subId) => (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setCategories((prev) =>
        prev.map((cat) => ({
          ...cat,
          subcategories: updateSubcategoriesRecursive(
            cat.subcategories || [],
            subId,
            (sub) => {
              const prods = sub.products || [];
              const oldIdx = prods.findIndex((p) => p.id === active.id);
              const newIdx = prods.findIndex((p) => p.id === over.id);
              if (oldIdx < 0 || newIdx < 0) return sub;
              return { ...sub, products: arrayMove(prods, oldIdx, newIdx) };
            },
          ),
        })),
      );
      setHasChanges(true);
    }
  };

  
  const handleSaveChanges = () => {
    startTransition(async () => {
      try {
        
        const catUpdates = categories.map((c, i) => ({
          id: c.id,
          display_order: i,
        }));
        await updateCategoryOrder(catUpdates);

        
        const subUpdates = [];
        const productUpdates = [];

        const collectUpdates = (subs, parentId, isParentCategory = false) => {
          subs.forEach((s, i) => {
            subUpdates.push({ id: s.id, display_order: i });
            if (s.products?.length > 0) {
              s.products.forEach((p, pi) => {
                productUpdates.push({ id: p.id, display_order: pi });
              });
            }
            if (s.subcategories?.length > 0) {
              collectUpdates(s.subcategories, s.id, false);
            }
          });
        };

        categories.forEach((cat) => {
          if (cat.subcategories?.length > 0) {
            collectUpdates(cat.subcategories, cat.id, true);
          }
        });

        if (subUpdates.length > 0) await updateSubcategoryOrder(subUpdates);
        if (productUpdates.length > 0) await updateProductOrder(productUpdates);

        setHasChanges(false);
        toast.success("Ordinea a fost salvată cu succes!");
      } catch (err) {
        console.error(err);
        toast.error("Eroare la salvarea ordinii.");
      }
    });
  };

  const handleCancelChanges = () => {
    setCategories(initialCategories);
    setHasChanges(false);
  };

  
  const handleOpenCreateCat = () => {
    setEditingCategory(null);
    setCatModalOpen(true);
  };
  const handleEditCat = (cat) => {
    setEditingCategory(cat);
    setCatModalOpen(true);
  };
  const handleDeleteCat = (id) => {
    setItemToDelete({
      id,
      type: "category",
      message:
        "Sigur vrei să ștergi această categorie și toate subcategoriile ei?",
    });
  };

  
  const handleOpenCreateSub = (category) => {
    setEditingSubcategory(null);
    setPreselectedCategoryId(category.id);
    setSubModalOpen(true);
    setExpanded((prev) => ({ ...prev, [category.id]: true }));
  };
  const handleEditSub = (sub) => {
    setEditingSubcategory(sub);
    setPreselectedCategoryId(sub.category_id);
    setSubModalOpen(true);
  };
  const handleDeleteSub = (id) => {
    setItemToDelete({
      id,
      type: "subcategory",
      message: "Sigur vrei să ștergi această subcategorie?",
    });
  };

  
  const handleOpenUnifiedAdd = (sub) => {
    setUnifiedAddTarget(sub);
    setActiveTab("product");
    setUnifiedAddModalOpen(true);
  };
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductModalOpen(true);
  };
  const handleDeleteProduct = (id) => {
    setItemToDelete({
      id,
      type: "product",
      message: "Sigur vrei să ștergi acest produs?",
    });
  };

  
  const handleExecuteDelete = async () => {
    if (!itemToDelete) return;
    const { id, type } = itemToDelete;

    try {
      if (type === "category") {
        await deleteCategory(id);
        setCategories(categories.filter((c) => c.id !== id));
        toast.success("Categorie ștearsă cu succes!");
      } else if (type === "subcategory") {
        await deleteSubcategory(id);
        setCategories(
          categories.map((cat) => ({
            ...cat,
            subcategories: deleteSubcategoryRecursive(
              cat.subcategories || [],
              id,
            ),
          })),
        );
        toast.success("Subcategorie ștearsă cu succes!");
      } else if (type === "product") {
        await deleteProduct(id);
        setCategories(
          categories.map((cat) => ({
            ...cat,
            subcategories: deleteProductRecursive(cat.subcategories || [], id),
          })),
        );
        toast.success("Produs șters cu succes!");
      }
      setItemToDelete(null);
    } catch (err) {
      toast.error(translateError(err));
      setItemToDelete(null);
    }
  };

  const closeCatModal = () => {
    setCatModalOpen(false);
    setEditingCategory(null);
  };
  const closeSubModal = () => {
    setSubModalOpen(false);
    setEditingSubcategory(null);
    setPreselectedCategoryId(null);
  };
  const closeProductModal = () => {
    setProductModalOpen(false);
    setEditingProduct(null);
    setPreselectedSubcategoryId(null);
  };
  const closeUnifiedAddModal = () => {
    setUnifiedAddModalOpen(false);
    setUnifiedAddTarget(null);
  };

  const closeMoveProductModal = () => {
    setMoveProductModalOpen(false);
    setMoveTargetParentId("");
  };

  const handleMoveProductSubmit = async (e) => {
    e.preventDefault();
    if (!moveTargetParentId || selectedProductIds.length === 0) {
      toast.error("Selectează o destinație și cel puțin un produs.");
      return;
    }

    let category_id = null;
    let subcategory_id = null;
    if (moveTargetParentId.startsWith("cat_")) {
      category_id = moveTargetParentId.replace("cat_", "");
    } else if (moveTargetParentId.startsWith("sub_")) {
      subcategory_id = moveTargetParentId.replace("sub_", "");
    }

    try {
      await Promise.all(
        selectedProductIds.map((id) =>
          moveProduct(id, { category_id, subcategory_id }),
        ),
      );
      toast.success(`${selectedProductIds.length} produse mutate cu succes!`);
      closeMoveProductModal();
      setIsSelectMode(false);
      setSelectedProductIds([]);
      window.location.reload();
    } catch (err) {
      toast.error(translateError(err));
    }
  };

  const getAllSubcategoriesRecursive = (subs) => {
    let result = [];
    subs.forEach((s) => {
      result.push(s);
      if (s.subcategories?.length > 0) {
        result = result.concat(getAllSubcategoriesRecursive(s.subcategories));
      }
    });
    return result;
  };

  const allSubcategories = categories.flatMap((c) =>
    getAllSubcategoriesRecursive(c.subcategories || []).map((s) => ({
      ...s,
      category_id: s.category_id || c.id,
    })),
  );

  const getAllProductsRecursive = (subs) => {
    let result = [];
    subs.forEach((s) => {
      if (s.products?.length > 0) {
        result = result.concat(s.products);
      }
      if (s.subcategories?.length > 0) {
        result = result.concat(getAllProductsRecursive(s.subcategories));
      }
    });
    return result;
  };

  const allProducts = categories.flatMap((c) => {
    const directProducts = c.products || [];
    const subProducts = getAllProductsRecursive(c.subcategories || []);
    return [...directProducts, ...subProducts];
  });

  
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth <= 768);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const getSearchResults = () => {
    if (!searchQuery.trim()) return { cats: [], subs: [], prods: [] };
    const q = removeDiacritics(searchQuery.toLowerCase());
    const cats = categories.filter((c) =>
      removeDiacritics(c.name.toLowerCase()).includes(q),
    );
    const subs = [];
    const prods = [];

    const traverse = (sList, catName, catId) => {
      sList.forEach((s) => {
        if (removeDiacritics(s.name.toLowerCase()).includes(q))
          subs.push({ ...s, _catName: catName, _catId: catId });
        (s.products || []).forEach((p) => {
          if (removeDiacritics(p.title.toLowerCase()).includes(q))
            prods.push({ ...p, _subName: s.name, _subId: s.id, _catId: catId });
        });
        if (s.subcategories?.length > 0) {
          traverse(s.subcategories, catName, catId);
        }
      });
    };

    categories.forEach((c) => {
      if (c.subcategories?.length > 0) {
        traverse(c.subcategories, c.name, c.id);
      }
      (c.products || []).forEach((p) => {
        if (removeDiacritics(p.title.toLowerCase()).includes(q))
          prods.push({ ...p, _catName: c.name, _catId: c.id });
      });
    });
    return { cats, subs, prods };
  };

  const handleSearchSelect = (type, item) => {
    setSearchQuery("");
    setIsSearchOpen(false);
    if (type === "category") {
      handleEditCat(item);
    } else if (type === "subcategory") {
      setExpanded((prev) => ({ ...prev, [item._catId]: true }));
      handleEditSub(item);
    } else if (type === "product") {
      setExpanded((prev) => ({ ...prev, [item._catId]: true }));
      setExpandedSubs((prev) => ({ ...prev, [item._subId]: true }));
      handleEditProduct(item);
    }
  };

  if (!mounted) return null;

  const searchResults = getSearchResults();
  const hasResults =
    searchResults.cats.length +
      searchResults.subs.length +
      searchResults.prods.length >
    0;

  
  
  
  return (
    <div className={pageStyles.container}>
      <div className={pageStyles.header}>
        <div className={pageStyles.headerTop}>
          <h1 className={pageStyles.title}>Inventar</h1>
          <button
            onClick={handleOpenCreateCat}
            className={pageStyles.addButton}
          >
            <Plus className={pageStyles.icon} />
            <span className={pageStyles.btnTextDesktop}>Adaugă Categorie</span>
            <span className={pageStyles.btnTextMobile}>Adaugă</span>
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          {}
          <div
            ref={searchRef}
            style={{
              position: "relative",
              flex: 1,
              maxWidth: isMobile ? "100%" : "500px",
            }}
          >
            <div style={{ position: "relative" }}>
              <Search
                size={16}
                style={{
                  position: "absolute",
                  left: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9ca3af",
                }}
              />
              <input
                type="text"
                placeholder="Caută categorii, subcategorii, produse..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem 0.5rem 2.25rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  outline: "none",
                }}
              />
            </div>
            {isSearchOpen && searchQuery.trim() && (
              <div
                style={{
                  position: "absolute",
                  zIndex: 100,
                  top: "100%",
                  left: 0,
                  right: 0,
                  marginTop: "0.25rem",
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                  maxHeight: 320,
                  overflowY: "auto",
                }}
              >
                {!hasResults && (
                  <div
                    style={{
                      padding: "0.75rem 1rem",
                      fontSize: "0.875rem",
                      color: "#6b7280",
                      textAlign: "center",
                    }}
                  >
                    Niciun rezultat găsit.
                  </div>
                )}

                {searchResults.cats.length > 0 && (
                  <>
                    <div
                      style={{
                        padding: "0.4rem 0.75rem",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        color: "#6b7280",
                        background: "#f9fafb",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Categorii
                    </div>
                    {searchResults.cats.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => handleSearchSelect("category", c)}
                        style={{
                          padding: "0.5rem 0.75rem",
                          cursor: "pointer",
                          fontSize: "0.875rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          borderBottom: "1px solid #f3f4f6",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#f0f9ff")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
                      >
                        {c.image ? (
                          <img
                            src={c.image}
                            alt=""
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 3,
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 3,
                              background: "#e5e7eb",
                              flexShrink: 0,
                            }}
                          />
                        )}
                        <span style={{ fontWeight: 500 }}>{c.name}</span>
                      </div>
                    ))}
                  </>
                )}

                {searchResults.subs.length > 0 && (
                  <>
                    <div
                      style={{
                        padding: "0.4rem 0.75rem",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        color: "#6b7280",
                        background: "#f9fafb",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Subcategorii
                    </div>
                    {searchResults.subs.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => handleSearchSelect("subcategory", s)}
                        style={{
                          padding: "0.5rem 0.75rem",
                          cursor: "pointer",
                          fontSize: "0.875rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          borderBottom: "1px solid #f3f4f6",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#f0f9ff")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
                      >
                        {s.image ? (
                          <img
                            src={s.image}
                            alt=""
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 3,
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 3,
                              background: "#e5e7eb",
                              flexShrink: 0,
                            }}
                          />
                        )}
                        <span>{s.name}</span>
                      </div>
                    ))}
                  </>
                )}

                {searchResults.prods.length > 0 && (
                  <>
                    <div
                      style={{
                        padding: "0.4rem 0.75rem",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        color: "#6b7280",
                        background: "#f9fafb",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Produse
                    </div>
                    {searchResults.prods.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleSearchSelect("product", p)}
                        style={{
                          padding: "0.5rem 0.75rem",
                          cursor: "pointer",
                          fontSize: "0.875rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          borderBottom: "1px solid #f3f4f6",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#f0f9ff")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
                      >
                        {p.image ? (
                          <img
                            src={p.image}
                            alt=""
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 3,
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 3,
                              background: "#e5e7eb",
                              flexShrink: 0,
                            }}
                          />
                        )}
                        <span>{p.title}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "1rem",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={handleExpandAll}
            style={{
              padding: "0.375rem 0.75rem",
              background: "#f3f4f6",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            Extinde Toate
          </button>
          <button
            onClick={handleCollapseAll}
            style={{
              padding: "0.375rem 0.75rem",
              background: "#f3f4f6",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            Restrânge Toate
          </button>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {isSelectMode && selectedProductIds.length > 0 && (
            <button
              onClick={() => setMoveProductModalOpen(true)}
              style={{
                padding: "0.375rem 0.75rem",
                background: "#3b82f6",
                color: "#fff",
                border: "none",
                borderRadius: "0.375rem",
                cursor: "pointer",
                fontSize: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <FolderInput size={16} /> Mută Selecția (
              {selectedProductIds.length})
            </button>
          )}
          <button
            onClick={() => {
              setIsSelectMode(!isSelectMode);
              if (isSelectMode) setSelectedProductIds([]);
            }}
            style={{
              padding: "0.375rem 0.75rem",
              background: isSelectMode ? "#eef2ff" : "#fff",
              color: isSelectMode ? "#4f46e5" : "#374151",
              border: `1px solid ${isSelectMode ? "#c7d2fe" : "#d1d5db"}`,
              borderRadius: "0.375rem",
              cursor: "pointer",
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            {isSelectMode ? <CheckSquare size={16} /> : <Square size={16} />}
            {isSelectMode ? "Anulare Selectare" : "Selectare Multiplă"}
          </button>
        </div>
      </div>

      <div className={tableStyles.tableContainer}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={() => {
            setExpanded({});
            setExpandedSubs({});
          }}
          onDragEnd={handleCategoryDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <table className={tableStyles.table}>
            <thead className={tableStyles.thead}>
              <tr>
                <th scope="col" className={tableStyles.thOrd}>
                  Ord
                </th>
                <th scope="col" className={tableStyles.thImage}>
                  Imagine
                </th>
                <th scope="col" className={tableStyles.th}>
                  Nume
                </th>
                <th scope="col" className={tableStyles.thRight}>
                  Acțiuni
                </th>
              </tr>
            </thead>
            <tbody className={tableStyles.tbody}>
              <SortableContext
                items={categories.map((c) => c.id)}
                strategy={verticalListSortingStrategy}
              >
                {categories.map((category) => (
                  <CategoryNode
                    key={category.id}
                    category={category}
                    expanded={expanded}
                    expandedSubs={expandedSubs}
                    toggleExpand={toggleExpand}
                    toggleSubExpand={toggleSubExpand}
                    handleOpenCreateSub={() => {
                      setEditingSubcategory(null);
                      setPreselectedCategoryId(category.id);
                      setSubModalOpen(true);
                    }}
                    handleEditCat={(cat) => {
                      setEditingCategory(cat);
                      setCatModalOpen(true);
                    }}
                    handleDeleteCat={handleDeleteCat}
                    sensors={sensors}
                    handleSubDragEnd={handleSubDragEnd}
                    handleProductDragEnd={handleProductDragEnd}
                    handleOpenUnifiedAdd={handleOpenUnifiedAdd}
                    handleEditSub={(sub) => {
                      setEditingSubcategory(sub);
                      setSubModalOpen(true);
                    }}
                    handleDeleteSub={handleDeleteSub}
                    handleEditProduct={(p) => {
                      setEditingProduct(p);
                      setProductModalOpen(true);
                    }}
                    handleDeleteProduct={handleDeleteProduct}
                    hideDragHandle={categories.length <= 1}
                    isSelectMode={isSelectMode}
                    selectedProductIds={selectedProductIds}
                    toggleProductSelection={toggleProductSelection}
                    onImageClick={handleOpenLightbox}
                  />
                ))}
              </SortableContext>
            </tbody>
          </table>
        </DndContext>

        {}
        {hasChanges && (
          <div
            style={{
              position: "fixed",
              bottom: "2rem",
              right: "2rem",
              margin: 0,
              padding: "1rem 1.5rem",
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "1rem",
              zIndex: 100,
            }}
          >
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={handleCancelChanges}
                disabled={isPending}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#4b5563",
                  background: "white",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f9fafb")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "white")
                }
              >
                Anulează
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={isPending}
                className={pageStyles.addButton}
                style={{
                  opacity: isPending ? 0.7 : 1,
                  pointerEvents: isPending ? "none" : "auto",
                  minWidth: "100px",
                  justifyContent: "center",
                }}
              >
                {isPending ? "Se salvează..." : "Salvează modificările"}
              </button>
            </div>
          </div>
        )}

        {categories.length === 0 && (
          <div className={tableStyles.emptyState}>
            Nu există categorii. Adaugă una nouă!
          </div>
        )}
      </div>

      {}
      <Modal
        isOpen={catModalOpen}
        onClose={closeCatModal}
        title={editingCategory ? "Editează Categorie" : "Adaugă Categorie"}
      >
        <CategoryForm
          initialData={editingCategory || {}}
          action={
            editingCategory
              ? updateCategory.bind(null, editingCategory.id)
              : createCategory
          }
          onSuccess={closeCatModal}
          flat={true}
        />
      </Modal>

      {}
      <Modal
        isOpen={subModalOpen}
        onClose={closeSubModal}
        title={
          editingSubcategory ? "Editează Subcategorie" : "Adaugă Subcategorie"
        }
      >
        <SubcategoryForm
          simplified={!editingSubcategory || editingSubcategory._isNewChild}
          initialData={
            editingSubcategory
              ? {
                  ...editingSubcategory,
                  category_id: editingSubcategory.category_id,
                }
              : { category_id: preselectedCategoryId }
          }
          categories={categories.map((c) => ({ id: c.id, name: c.name }))}
          subcategories={allSubcategories}
          action={
            editingSubcategory && !editingSubcategory._isNewChild
              ? updateSubcategory.bind(null, editingSubcategory.id)
              : createSubcategory
          }
          onSuccess={closeSubModal}
          flat={true}
        />
      </Modal>

      {}
      <Modal
        isOpen={productModalOpen}
        onClose={closeProductModal}
        title={editingProduct ? "Editează Produs" : "Adaugă Produs"}
      >
        <ProductForm
          initialData={
            editingProduct
              ? editingProduct
              : { subcategory_id: preselectedSubcategoryId }
          }
          categories={categories.map((c) => ({
            id: c.id,
            name: c.name,
            subcategories: c.subcategories || [],
          }))}
          allProducts={allProducts}
          action={
            editingProduct
              ? updateProduct.bind(null, editingProduct.id)
              : createProduct
          }
          onSuccess={closeProductModal}
          flat={true}
        />
      </Modal>

      {}
      <Modal
        isOpen={unifiedAddModalOpen}
        onClose={closeUnifiedAddModal}
        title={`Adaugă în "${unifiedAddTarget?.name}"`}
      >
        <div
          style={{
            display: "flex",
            backgroundColor: "#f3f4f6",
            padding: "0.25rem",
            borderRadius: "0.75rem",
            marginBottom: "2rem",
            gap: "0.25rem",
          }}
        >
          <button
            onClick={() => setActiveTab("product")}
            style={{
              flex: 1,
              padding: "0.75rem 1rem",
              borderRadius: "0.6rem",
              border: "none",
              backgroundColor: activeTab === "product" ? "#fff" : "transparent",
              color: activeTab === "product" ? "#2563eb" : "#6b7280",
              fontWeight: 600,
              fontSize: "0.95rem",
              boxShadow:
                activeTab === "product"
                  ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                  : "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Produs Nou
          </button>
          <button
            onClick={() => setActiveTab("subcategory")}
            style={{
              flex: 1,
              padding: "0.75rem 1rem",
              borderRadius: "0.6rem",
              border: "none",
              backgroundColor:
                activeTab === "subcategory" ? "#fff" : "transparent",
              color: activeTab === "subcategory" ? "#2563eb" : "#6b7280",
              fontWeight: 600,
              fontSize: "0.95rem",
              boxShadow:
                activeTab === "subcategory"
                  ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                  : "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Subcategorie Nouă
          </button>
        </div>

        {activeTab === "product" ? (
          <ProductForm
            initialData={{
              category_id: !unifiedAddTarget?.category_id
                ? unifiedAddTarget?.id
                : undefined,
              subcategory_id: unifiedAddTarget?.category_id
                ? unifiedAddTarget?.id
                : undefined,
            }}
            categories={categories.map((c) => ({
              id: c.id,
              name: c.name,
              subcategories: c.subcategories || [],
            }))}
            allProducts={allProducts}
            action={createProduct}
            onSuccess={closeUnifiedAddModal}
            flat={true}
          />
        ) : (
          <SubcategoryForm
            simplified={true}
            initialData={{
              category_id:
                unifiedAddTarget?.category_id || unifiedAddTarget?.id,
              parent_id: unifiedAddTarget?.category_id
                ? unifiedAddTarget?.id
                : undefined,
            }}
            categories={categories.map((c) => ({ id: c.id, name: c.name }))}
            subcategories={allSubcategories}
            action={createSubcategory}
            onSuccess={closeUnifiedAddModal}
            flat={true}
          />
        )}
      </Modal>

      {}
      <Modal
        isOpen={moveProductModalOpen}
        onClose={closeMoveProductModal}
        title={`Mută ${selectedProductIds.length} produse`}
      >
        <form onSubmit={handleMoveProductSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 500,
                color: "#374151",
                fontSize: "0.875rem",
              }}
            >
              Selectează noua destinație
            </label>
            <select
              required
              value={moveTargetParentId}
              onChange={(e) => setMoveTargetParentId(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #d1d5db",
                backgroundColor: "#fff",
                outline: "none",
                fontSize: "0.875rem",
              }}
            >
              <option value="" disabled>
                Alege o categorie sau subcategorie...
              </option>
              {categories.map((cat) => (
                <optgroup key={cat.id} label={`📦 ${cat.name}`}>
                  <option
                    value={`cat_${cat.id}`}
                    disabled={cat.subcategories && cat.subcategories.length > 0}
                  >
                    ↳ {cat.name} (Categorie Principală)
                  </option>
                  {(() => {
                    const flatten = (subs, level = 0) => {
                      let results = [];
                      subs.forEach((s) => {
                        results.push(
                          <option
                            key={s.id}
                            value={`sub_${s.id}`}
                            disabled={
                              s.subcategories && s.subcategories.length > 0
                            }
                          >
                            {"\u00A0".repeat((level + 1) * 4)}↳ {s.name}
                          </option>,
                        );
                        if (s.subcategories && s.subcategories.length > 0) {
                          results = results.concat(
                            flatten(s.subcategories, level + 1),
                          );
                        }
                      });
                      return results;
                    };
                    return flatten(cat.subcategories || []);
                  })()}
                </optgroup>
              ))}
            </select>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            <button
              type="button"
              onClick={closeMoveProductModal}
              style={{
                padding: "0.625rem 1.25rem",
                color: "#374151",
                border: "1px solid #d1d5db",
                background: "#fff",
                cursor: "pointer",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              Anulează
            </button>
            <button
              type="submit"
              style={{
                padding: "0.625rem 1.25rem",
                backgroundColor: "#3b82f6",
                color: "white",
                borderRadius: "0.375rem",
                border: "none",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              Mută Produsul
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleExecuteDelete}
        message={itemToDelete?.message}
      />

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={[{ src: activeImage }]}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />
    </div>
  );
}
