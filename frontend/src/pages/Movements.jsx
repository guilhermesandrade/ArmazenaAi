import { useState, useEffect } from 'react';
import api from '../services/api';


export default function Movements() {
const [movements, setMovements] = useState([]);
const [products, setProducts] = useState([]);
const [form, setForm] = useState({ productId: '', type: 'entrada', quantity: 1 });


const fetchData = async () => {
const [prodRes, movRes] = await Promise.all([
api.get('/products'),
api.get('/movements'),
]);
setProducts(prodRes.data);
setMovements(movRes.data);
};


useEffect(() => { fetchData(); }, []);


const handleSubmit = async (e) => {
e.preventDefault();
await api.post('/movements', form);
fetchData();
};


return (
<div>
<h2>Movimentações</h2>
<form onSubmit={handleSubmit}>
<select onChange={(e) => setForm({ ...form, productId: e.target.value })}>
<option value="">Selecione o produto</option>
{products.map((p) => <option key={p._id} value={p._id}>{p.name}</option>)}
</select>
<select onChange={(e) => setForm({ ...form, type: e.target.value })}>
<option value="entrada">Entrada</option>
<option value="saida">Saída</option>
</select>
<input type="number" min="1" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
<button type="submit">Registrar</button>
</form>


<ul>
{movements.map((m) => (
<li key={m._id}>{m.productId?.name} - {m.type} ({m.quantity})</li>
))}
</ul>
</div>
);
}