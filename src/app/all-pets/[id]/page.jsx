import React from 'react';


const fetchSinglePet = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/pets/${id}`,
  );
  const data = await res.json();
  return data;
};

const PetDetailsPage = async ({ params }) => {
  const { id } = await params;
  const pet = await fetchSinglePet(id);

  return (
    <div>
      <h1>{pet.name}</h1>
      <p>{pet.description}</p>
    </div>
  );
};

export default PetDetailsPage;
