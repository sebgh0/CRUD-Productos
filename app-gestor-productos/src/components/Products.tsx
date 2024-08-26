import React, { useEffect, useState } from "react";
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

interface Product {
    product_id: number;
    name: string;
    price: number;
    stock_quantity: number;
    category_id: number;
    created_at?: string;
    updated_at?: string;
}

interface Category {
    category_id: number;
    name: string;
}

export const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [product, setProduct] = useState<Product | null>(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const toast = React.useRef<Toast>(null);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/v1/products');
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/v1/categories');
            setCategories(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const openNew = () => {
        setProduct({ product_id: 0, name: '', price: 0, stock_quantity: 0, category_id: 0 });
        setEditMode(false);
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setDialogVisible(false);
        setProduct(null);
    };

    const saveProduct = async () => {
        if (product) {
            try {
                if (editMode) {
                    await axios.put(`/api/v1/products/${product.product_id}`, product);
                } else {
                    // Excluye product_id al crear un nuevo producto
                    const { product_id, ...newProduct } = product;
                    await axios.post('/api/v1/products', newProduct);
                }
                fetchProducts();
                hideDialog();
                toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Product saved' });
            } catch (error) {
                console.error(error);
                toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to save product' });
            }
        }
    };

    const editProduct = (product: Product) => {
        setProduct({ ...product });
        setEditMode(true);
        setDialogVisible(true);
    };

    const deleteProduct = async (productId: number) => {
        try {
            await axios.delete(`/api/v1/products/${productId}`);
            fetchProducts();
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Product deleted' });
        } catch (error) {
            console.error(error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete product' });
        }
    };

    return(
        <div>
            <Toast ref={toast} />
            <h1>Gestión de Productos</h1>

            <Button label="Agregar" icon="pi pi-plus" onClick={openNew} />
            <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                <Column field="product_id" header="ID"></Column>
                <Column field="name" header="Nombre"></Column>
                <Column field="price" header="Precio"></Column>
                <Column field="stock_quantity" header="Cantidad en Stock"></Column>
                <Column field="category_id" header="ID Categoría"></Column>
                <Column
                    header="Acciones"
                    body={(rowData: Product) => (
                        <div>
                            <Button
                                label="Editar"
                                icon="pi pi-pencil"
                                className="p-button-rounded p-button-success p-mr-2"
                                onClick={() => editProduct(rowData)}
                            />
                            <Button
                                label="Eliminar"
                                icon="pi pi-trash"
                                className="p-button-rounded p-button-danger"
                                onClick={() => deleteProduct(rowData.product_id)}
                            />
                        </div>
                    )}
                />
            </DataTable>

            <Dialog
                header={editMode ? "Editar Producto" : "Nuevo Producto"}
                visible={dialogVisible}
                style={{ width: '30vw' }}
                onHide={hideDialog}
            >
                <div className="p-field">
                    <label htmlFor="name">Nombre</label>
                    <InputText
                        id="name"
                        placeholder="Nombre"
                        value={product?.name || ''}
                        onChange={(e) => setProduct({ ...product!, name: e.target.value })}
                    />
                </div>
 

                <div className="p-field">
                    <label htmlFor="price">Precio</label>
                    <InputText
                        id="price"
                        placeholder="Precio"
                        value={product?.price?.toString() || ''}
                        onChange={(e) => setProduct({ ...product!, price: parseFloat(e.target.value) })}
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="stock_quantity">Cantidad en Stock</label>
                    <InputText
                        id="stock_quantity"
                        placeholder="Cantidad en Stock"
                        value={product?.stock_quantity?.toString() || ''}
                        onChange={(e) => setProduct({ ...product!, stock_quantity: parseInt(e.target.value) })}
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="category_id">Categoría</label>
                    <Dropdown
                        id="category_id"
                        value={product?.category_id}
                        options={categories}
                        onChange={(e) => setProduct(product ? { ...product, category_id: e.value } : null)}
                        optionLabel="name"
                        optionValue="category_id"
                        placeholder="Seleccionar Categoría"
                    />
                </div>
                <div className="p-field">
                    <Button label="Guardar" onClick={saveProduct} />
                </div>
            </Dialog>
        </div>
    );
}