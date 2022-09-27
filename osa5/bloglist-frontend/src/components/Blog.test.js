import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Togglable />", () => {
    let likeMockHandler;

    const dummyBlog = {
        title: "Testing blog",
        author: "User A",
        url: "/testurl",
        likes: 5,
        id: "1",
        user: {
            id: "2"
        }
    };

    beforeEach(() => {
        likeMockHandler = jest.fn();
        render(<Blog blog={dummyBlog} handleLikeUpdate={likeMockHandler} />);
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

    // Test that button click opens hidden elements.
    test("displays content on button press", async () => {
        const user = userEvent.setup();
        const button = screen.getByText("View");
        await user.click(button);

        const urlElement = screen.queryByText(dummyBlog.url);
        const likesElement = screen.queryByText(dummyBlog.likes);
        expect(urlElement).toBeDefined();
        expect(likesElement).toBeDefined();
    });

    // Test that like double click  triggers method two times.
    test("like double click triggers method twice", async () => {
        const user = userEvent.setup();
        const button = screen.getByText("View");
        await user.click(button);

        let likeButton = screen.getByText("Like");
        await user.dblClick(likeButton);

        expect(likeMockHandler.mock.calls).toHaveLength(2);

    });
});
