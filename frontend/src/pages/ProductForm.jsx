import { useState } from 'react';


export default function ProductForm({ onSubmit }) {
const [form, setForm] = useState({ name: '', category: '', size: '', color: '', price: 0, quantity: 0 });


const handleSubmit = (e) => {
e.preventDefault();
onSubmit(form);
setForm({ name: '', category: '', size: '', color: '', price: 0, quantity: 0 });
};


return (
<form onSubmit={handleSubmit} className="product-form">
<input placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
<input placeholder="Categoria" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
<input placeholder="Tamanho" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} />
<input placeholder="Cor" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />
<input type="number" placeholder="Preço" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
<input type="number" placeholder="Quantidade" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
<button type="submit">Salvar Produto</button>
</form>
);
}