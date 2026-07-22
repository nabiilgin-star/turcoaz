"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import tableStyles from "@/app/components/admin/admin-table.module.css";
import pageStyles from "@/app/admin/admin-page.module.css";
import Modal from "@/app/components/admin/Modal";
import ConfirmModal from "@/app/components/admin/ConfirmModal";
import QuestionsForm from "@/app/components/admin/QuestionsForm";
import toast from "react-hot-toast";
import { deleteFAQ, createFAQ, updateFAQ } from "@/app/actions/faq";

export default function QuestionsClient({ initialFaqs }) {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [faqToDelete, setFaqToDelete] = useState(null);

  useEffect(() => {
    setFaqs(initialFaqs);
  }, [initialFaqs]);

  const handleOpenCreate = () => {
    setEditingFaq(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (faq) => {
    setEditingFaq(faq);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFaq(null);
  };

  const handleDelete = async () => {
    if (faqToDelete) {
      await deleteFAQ(faqToDelete);
      setFaqs(faqs.filter((f) => f.id !== faqToDelete));
      setFaqToDelete(null);
      toast.success("Întrebare ștearsă cu succes!");
    }
  };

  const confirmDelete = (id) => {
    setFaqToDelete(id);
  };

  return (
    <div className={pageStyles.container}>
      <div className={pageStyles.header}>
        <div className={pageStyles.headerTop}>
          <h1 className={pageStyles.title}>Întrebări frecvente</h1>
          <button onClick={handleOpenCreate} className={pageStyles.addButton}>
            <Plus className={pageStyles.icon} />
            <span className={pageStyles.btnTextDesktop}>Adaugă Întrebare</span>
            <span className={pageStyles.btnTextMobile}>Adaugă</span>
          </button>
        </div>
      </div>

      <div className={tableStyles.tableContainer}>
        <table className={tableStyles.table}>
          <thead className={tableStyles.thead}>
            <tr>
              <th scope="col" className={tableStyles.th}>
                Întrebare
              </th>
              <th scope="col" className={tableStyles.th}>
                Răspuns
              </th>
              <th scope="col" className={tableStyles.thRight}>
                Acțiuni
              </th>
            </tr>
          </thead>
          <tbody className={tableStyles.tbody}>
            {faqs.map((faq) => (
              <tr key={faq.id} className={tableStyles.tr}>
                <td className={tableStyles.tdPrimary}>{faq.question}</td>
                <td className={tableStyles.td}>
                  <span
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      maxWidth: "400px",
                    }}
                  >
                    {faq.answer}
                  </span>
                </td>
                <td className={tableStyles.tdActions}>
                  <div className={tableStyles.actionsContainer}>
                    <button
                      onClick={() => handleOpenEdit(faq)}
                      className={tableStyles.actionButton}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => confirmDelete(faq.id)}
                      className={tableStyles.deleteButton}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {faqs.length === 0 && (
          <div className={tableStyles.emptyState}>
            Nu există întrebări. Adaugă una nouă!
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingFaq ? "Editează Întrebare" : "Adaugă Întrebare"}
      >
        <QuestionsForm
          initialData={editingFaq || {}}
          action={editingFaq ? updateFAQ.bind(null, editingFaq.id) : createFAQ}
          onSuccess={() => {
            handleCloseModal();
          }}
          flat={true}
        />
      </Modal>

      <ConfirmModal
        isOpen={!!faqToDelete}
        onClose={() => setFaqToDelete(null)}
        onConfirm={handleDelete}
        message="Sigur vrei să ștergi această întrebare?"
      />
    </div>
  );
}
