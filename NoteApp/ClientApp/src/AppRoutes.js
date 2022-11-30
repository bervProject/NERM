import { FetchData } from "./components/FetchData";
import { NoteForm } from "./components/NoteForm";
import { Home } from "./components/Home";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/note-list',
        element: <FetchData />
    },
    {
        path: '/note-form/:id',
        element: <NoteForm />
    },
    {
        path: '/note-form',
        element: <NoteForm />
    }
];

export default AppRoutes;
