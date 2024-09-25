const CartPage = () => {
  return (
    <section className="grid grid-cols-2">
      <div>
        <h2 className="text-2xl font-bold">Cart</h2>
        <div>
          <div className="flex gap-4 rounded-t-lg border border-slate-400 px-6 py-4">
            <input type="checkbox" name="select-all" id="select-all" />
            <label htmlFor="select-all" className="font-medium">
              Select All
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CartPage;
