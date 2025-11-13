import { useEffect, useState } from 'react';
import api from '../services/api';


export default function Products() {
const [products, setProducts] = useState([]);
const [form, setForm] = useState({ name: '', category: '', quantity: 0 });


const fetchProducts = async () => {
const res = await api.get('/products');
setProducts(res.data);
};


useEffect(() => { fetchProducts(); }, []);


const handleSubmit = async (e) => {
e.preventDefault();
await api.post('/products', form);
fetchProducts();
};


return (
<div>
<h2>Produtos</h2>
<form onSubmit={handleSubmit}>
<input placeholder="Nome" onChange={(e) => setForm({ ...form, name: e.target.value })} />
<input placeholder="Categoria" onChange={(e) => setForm({ ...form, category: e.target.value })} />
<input placeholder="Quantidade" type="number" onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
<button type="submit">Adicionar</button>
</form>


<ul>
{products.map((p) => (
<li key={p._id}>{p.name} - {p.category} ({p.quantity})</li>
))}
</ul>
</div>
);
}