import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import "./App.css";
import PostBook from "./components/PostBook";
import NotFound from "./components/NotFound";
import BookItemDetails from "./components/BookItemDetails";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/book/add" element={<PostBook />} />
        <Route path="/book/:id" element={<BookItemDetails />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
