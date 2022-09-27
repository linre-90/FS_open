/*
Make a test for the new blog form. The test should check,
that the form calls the event handler it received as props with the right details when a new blog is created.
*/

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateBlog } from "./CreateBlog";

describe("<CreateBlog />", () => {

    // Test that blog creation works and returns correct values.
    test("create blog with correct values", async () => {
        const testBlog = {
            title: "Testing blog",
            url: "/testurl",
            author: "User A",
        };

        let createBlogMockHandler = jest.fn();
        render(<CreateBlog createBlog={createBlogMockHandler}/>);

        const user = userEvent.setup();
        const inputElemnts = screen.getAllByRole("textbox");
        const sendButton = screen.getByText("save");

        await user.type(inputElemnts[0], testBlog.title);
        await user.type(inputElemnts[1], testBlog.author);
        await user.type(inputElemnts[2], testBlog.url);

        await user.click(sendButton);

        expect(createBlogMockHandler.mock.calls).toHaveLength(1);
        expect(createBlogMockHandler.mock.calls[0][0]).toEqual(testBlog);

    });
});
