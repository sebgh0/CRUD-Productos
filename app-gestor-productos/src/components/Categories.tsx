import React, { useEffect, useState } from "react";
import axios from 'axios';
import {DataTable} from 'primereact/datatable';
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from 'primereact/inputtext';


axios.defaults.baseURL = 'http://localhost:3001';

interface Category{
    category_id: number;
    name: string;
    description: string;
}

export const Categories:React.FC = () => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState<Category | null>(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const toast = React.useRef<Toast>(null);


    useEffect(() => {
        fetchCategories();
      }, []);
    
    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/v1/categories');
            setCategories(response.data);
        } catch (error) {
            console.error(error);
        }
    };
      
    const openNew = () => {
        setCategory({ category_id: 0, name: '', description: '' });
        setEditMode(false);
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setDialogVisible(false);
        setCategory(null);
    };

    const saveCategory = async () => {
        if (category) {
            try {
                if (editMode) {
                    await axios.put(`/api/v1/categories/${category.category_id}`, category);
                } else {
                    await axios.post('/api/v1/categories', category);
                }
                fetchCategories();
                hideDialog();
                toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Category saved' });
            } catch (error) {
                console.error(error);
                toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to save category' });
            }
        }
    };

    const editCategory = (category: Category) => {
        setCategory({ ...category });
        setEditMode(true);
        setDialogVisible(true);
    };

    const deleteCategory = async (categoryId: number) => {
        try {
            await axios.delete(`/api/v1/categories/${categoryId}`);
            fetchCategories();
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Category deleted' });
        } catch (error) {
            console.error(error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete category' });
        }
    };

    return(
        <div>
            <Toast ref={toast} />
            <h1>Gestión de Categorías</h1>

            <Button label="Agregar" icon="pi pi-plus" onClick={openNew} />
            <DataTable value={categories} tableStyle={{ minWidth: '50rem' }}>
                <Column field="category_id" header="ID"></Column>
                <Column field="name" header="Nombre Categoría"></Column>
                <Column field="description" header="Descripción"></Column>
                <Column
                    header="Acciones"
                    body={(rowData: Category) => (
                        <div>
                            <Button
                                label="Editar"
                                icon="pi pi-pencil"
                                className="p-button-rounded p-button-success p-mr-2"
                                onClick={() => editCategory(rowData)}
                            />
                            <Button
                                label="Eliminar"
                                icon="pi pi-trash"
                                className="p-button-rounded p-button-danger"
                                onClick={() => deleteCategory(rowData.category_id)}
                            />
                        </div>
                    )}
                />
            </DataTable>

            <Dialog
                header={editMode ? "Editar Categoría" : "Nueva Categoría"}
                visible={dialogVisible}
                style={{ width: '30vw' }}
                onHide={hideDialog}
            >
                <div className="p-field">
                    <label htmlFor="name">Nombre</label>
                    <InputText
                        id="name"
                        placeholder="Nombre "
                        value={category?.name || ''}
                        onChange={(e) => setCategory({ ...category!, name: e.target.value })}
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="description">Descripción</label>
                    <InputText
                        id="description"
                        placeholder="Descripción "
                        value={category?.description || ''}
                        onChange={(e) => setCategory({ ...category!, description: e.target.value })}
                    />
                </div>
                <div className="p-field">
                    <Button label="Guardar" onClick={saveCategory} />
                </div>
            </Dialog>
        </div>
        
    );
}