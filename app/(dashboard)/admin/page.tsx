import { createClient } from "@/utils/supabase/server";
const AdminPage = async () => {
  const supabase = await createClient();

  const { data: customers } = await supabase.from("customers").select();
  return (
    <div>
      <ul>
        {customers?.map((customer) => (
          <li key={customer.id}>{customer.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
