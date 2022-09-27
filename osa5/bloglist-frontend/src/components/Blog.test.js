import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
//import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Togglable />", () => {
    let container;

    const dummyBlog = {
        title: "Testing blog",
        author: "User A",
        url: "/testurl",
        likes: 5,
    };

    beforeEach(() => {
        container = render(<Blog blog={dummyBlog} />).container;
    });

    // Tests that author and title div element are visible and no element
    // with url or likes is found.
    test("displays only author and title", () => {
        const titleAuthorElement = screen.getByText(`${dummyBlog.title} ${dummyBlog.author}`);
        expect(titleAuthorElement).toBeDefined();

        const urlElement = screen.queryByText(dummyBlog.url);
        const likesElement = screen.queryByText(dummyBlog.likes);
        expect(urlElement).toBeNull();
        expect(likesElement).toBeNull();
    });



    
});
