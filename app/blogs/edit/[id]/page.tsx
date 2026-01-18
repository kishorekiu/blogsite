const EditBlogPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <div>
      <p>Edit Blog with id: {id}</p>
    </div>
  );
};

export default EditBlogPage;
