import axios from "axios";

const tutorialURL = "http://localhost:3000/api/tutorials";

export const getAllTutorialPagination = async (page, perPage) => {
  const token = localStorage.getItem("token");
  return await axios.get(`${tutorialURL}/pagination`, {
    params: {
      page,
      perPage,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllTutorialService = async () => {
  return await axios.get(`${tutorialURL}`);
};

export const updateTutorialService = async (currentTutorial, modalTutorial) => {
  const result = await axios.put(
    `${tutorialURL}/${currentTutorial.id}`,
    modalTutorial
  );
  return result;
};

export const createTutorialService = async (createdTutorial) => {
  const token = localStorage.getItem("token");
  return await axios.post(`${tutorialURL}`, createdTutorial, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editTutorialService = async (tutorialId) => {
  return await axios.get(`${tutorialURL}/${tutorialId}`);
};

export const deleteTutorialService = async (tutorialId) => {
  return await axios.delete(`${tutorialURL}/${tutorialId}`);
};
