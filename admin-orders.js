// Initialize Supabase client (use service role key in Netlify function ideally)
const SUPABASE_URL = "https://sjyctlwlbriisblcksfd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqeWN0bHdsYnJpaXNibGNrc2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3OTY5MDksImV4cCI6MjA4NzM3MjkwOX0.pA9q6gW7cljyJECnAT11ZnwKCZ7owINc8MTlOnHyWKA"; // optional if only admin function
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadOrders() {
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  const tbody = document.getElementById("ordersTableBody");
  tbody.innerHTML = "";

  orders.forEach(order => {
    const tr = document.createElement("tr");
    tr.classList.add("border-b");

    tr.innerHTML = `
      <td class="p-2">${order.user_id}</td>
      <td class="p-2">${order.service_id}</td>
      <td class="p-2">${order.link}</td>
      <td class="p-2">${order.quantity}</td>
      <td class="p-2">${order.price}</td>
      <td class="p-2">${order.status}</td>
      <td class="p-2">${new Date(order.created_at).toLocaleString()}</td>
    `;

    tbody.appendChild(tr);
  });
}

loadOrders();
tr.classList.add("hover:bg-blue-50");