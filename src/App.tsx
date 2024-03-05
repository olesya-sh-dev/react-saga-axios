import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

export type GetTodoListsResponse = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: TodolistViewModel[];
};

export type TodolistViewModel = {
  isImportant: boolean;
  id: string;
  title: string;
  description: string;
  addedDate: string;
  order: number;
  images: TodoListImagesViewModel;
};
export type TodoListImagesViewModel = {
  main: PhotoSizeViewModel[];
};

export type PhotoSizeViewModel = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
};

function App() {
  const [todolists, setTodolists] = useState<TodolistViewModel[]>([]);

  useEffect(() => {
    console.log("useEffect");
    axios
      .get<GetTodoListsResponse>(
        "https://todolists.samuraijs.com/api/1.0/todolists"
      )
      .then((response) => {
        //console.log(response.data);
        setTodolists(response.data.items);
      });
    // .catch((error) => {
    //   console.error("Ошибка при получении данных:", error);
    // });
  }, []); /*call effect only once*/

  console.log("rendering");
  return (
    <div>
      <div>
        {todolists.map((t) => {
          const imageUrl =
            t.images.main.length > 1
              ? t.images.main[1]?.url
              : "https://placehold.co/48";

          return (
            <div key={t.id.toString()}>
              <img src={imageUrl} />
              <h3>
                {t.isImportant ? "🔥" : ""}
                {t.title}
              </h3>
              <div>{t.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
