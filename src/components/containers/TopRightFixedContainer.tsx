const TopRightFixedContainer = ({ children }: any) => {
  return (
    <aside className="fixed right-0 top-0 p-3 z-[99999] flex flex-col gap-2">
      {children}
    </aside>
  );
};

export default TopRightFixedContainer;
