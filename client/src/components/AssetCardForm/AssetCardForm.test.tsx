/** @format */

import {
    render,
    screen,
    cleanup,
    waitFor,
    fireEvent,
} from "@testing-library/react";
import { UserEvent, userEvent } from "@testing-library/user-event";
import { AssetCardForm } from "./AssetCardForm";
import { AssetCard } from "../../types/Card";
import {
    test,
    describe,
    vi,
    expect,
    beforeAll,
    beforeEach,
    MockedFunction,
} from "vitest";

const getMockCard = (): AssetCard => {
    return {
        category: "combat talent",
        description: "",
        has_name_field: false,
        health: 2,
        properties: [
            { description: "", indents: 0, is_upgradeable: false, title: "" },
        ],
        title: "",
    };
};

async function test_ant_select_on_change_event(
    mockCard: AssetCard,
    mockSetter: MockedFunction<() => void>,
    testId: string,
    optionTitle: string,
    user: UserEvent
) {
    render(<AssetCardForm card={mockCard} setCard={mockSetter} />);

    const element = await screen.findByTestId(testId);
    user.click(element.firstElementChild!);

    const option = await screen.findByTitle(optionTitle);
    expect(option).not.toBeNull();

    user.hover(option);
    user.click(option);
}

describe("Testing AssetCardForm Render", () => {
    beforeAll(() => {
        cleanup();
        render(<AssetCardForm card={getMockCard()} setCard={vi.fn()} />);
    });

    test("Should find card", async () => {
        const element = await screen.findByTestId("asset-card-form");
        expect(element).not.toBeNull();
    });

    test("Should find category control", async () => {
        const element = await screen.findByTestId("asset-card-form-category");
        expect(element).not.toBeNull();
    });

    test("Should find title control", async () => {
        const element = await screen.findByTestId("asset-card-form-title");
        expect(element).not.toBeNull();
    });

    test("Should find name control", async () => {
        const element = await screen.findByTestId("asset-card-form-name");
        expect(element).not.toBeNull();
    });

    test("Should find description control", async () => {
        const element = await screen.findByTestId(
            "asset-card-form-description"
        );
        expect(element).not.toBeNull();
    });

    test("Should find health control", async () => {
        const element = await screen.findByTestId("asset-card-form-health");
        expect(element).not.toBeNull();
    });

    test("Should find add-property control", async () => {
        const element = await screen.findByTestId(
            "asset-card-form-add-property"
        );
        expect(element).not.toBeNull();
    });

    test("Should find only properties", async () => {
        const elements = await screen.findAllByTestId(
            "asset-card-form-property"
        );
        expect(elements.length).toBe(1);
    });

    test("Should have remove-control in only properties", async () => {
        const elements = await screen.findAllByTestId(
            "asset-card-form-property-remove"
        );
        expect(elements.length).toBe(1);
    });

    test("Should have indents-control in only properties", async () => {
        const elements = await screen.findAllByTestId(
            "asset-card-form-property-indents"
        );
        expect(elements.length).toBe(1);
    });

    test("Should have upgrade-control in only properties", async () => {
        const elements = await screen.findAllByTestId(
            "asset-card-form-property-upgrade"
        );
        expect(elements.length).toBe(1);
    });

    test("Should have title-control in only properties", async () => {
        const elements = await screen.findAllByTestId(
            "asset-card-form-property-title"
        );
        expect(elements.length).toBe(1);
    });

    test("Should have description-control in only properties", async () => {
        const elements = await screen.findAllByTestId(
            "asset-card-form-property-description"
        );
        expect(elements.length).toBe(1);
    });
});

describe("Testing setCard-Prop in Category-Select", () => {
    const mockSetter = vi.fn();
    const user = userEvent.setup();

    beforeEach(() => {
        cleanup();
        mockSetter.mockClear();
    });

    test("Should render ritual option and fire its onChange event with the changed card", async () => {
        await test_ant_select_on_change_event(
            getMockCard(),
            mockSetter,
            "asset-card-form-category",
            "Ritual",
            user
        );
        await waitFor(async () => {
            return expect(mockSetter).toHaveBeenCalledWith({
                ...getMockCard(),
                category: "ritual",
            });
        });
    });

    test("Should render companion option and fire its onChange event with the changed card", async () => {
        await test_ant_select_on_change_event(
            getMockCard(),
            mockSetter,
            "asset-card-form-category",
            "Companion",
            user
        );
        await waitFor(async () => {
            return expect(mockSetter).toHaveBeenCalledWith({
                ...getMockCard(),
                category: "companion",
            });
        });
    });

    test("Should render combat talent option and fire its onChange event with the changed card", async () => {
        await test_ant_select_on_change_event(
            // We need to set the initial value to something other than "combat talent" on order to trigger onChange
            { ...getMockCard(), category: "path" },
            mockSetter,
            "asset-card-form-category",
            "Combat Talent",
            user
        );
        await waitFor(async () => {
            return expect(mockSetter).toHaveBeenCalledWith({
                ...getMockCard(),
                category: "combat talent",
            });
        });
    });

    test("Should render path option and fire its onChange event with the changed card", async () => {
        await test_ant_select_on_change_event(
            getMockCard(),
            mockSetter,
            "asset-card-form-category",
            "Path",
            user
        );
        await waitFor(async () => {
            return expect(mockSetter).toHaveBeenCalledWith({
                ...getMockCard(),
                category: "path",
            });
        });
    });
});

describe("Testing setCard-Prop in Health-Select", () => {
    const user = userEvent.setup();
    const mockSetter = vi.fn();
    beforeEach(() => {
        cleanup();
        mockSetter.mockClear();
    });

    test("Should render health options and fire its onChange event with the changed card", async () => {
        const options = [
            "0 Health",
            "1 Health",
            "2 Health",
            "3 Health",
            "4 Health",
            "5 Health",
        ];

        for (const option of options) {
            const expectedValue = parseInt(option.charAt(0));
            cleanup();
            console.log(`Before change event: ${option}`);
            await test_ant_select_on_change_event(
                {
                    ...getMockCard(),
                    health: expectedValue === 0 ? 1 : 0,
                },
                mockSetter,
                "asset-card-form-health",
                option,
                user
            );
            console.log(`After change event: ${option}`);
            await waitFor(() => {
                console.log(`In wait-for: ${option}`);
                expect(mockSetter).toHaveBeenCalledWith({
                    ...getMockCard(),
                    health: expectedValue,
                });
            });
        }
    });
});

describe("Testing setCard-Prop in NameField Toggle", async () => {
    const user = userEvent.setup();
    const mockSetter = vi.fn();
    beforeEach(() => {
        cleanup();
        mockSetter.mockClear();
    });

    test("Should call setCard when activating NameField", async () => {
        render(
            <AssetCardForm
                card={{ ...getMockCard(), has_name_field: false }}
                setCard={mockSetter}
            />
        );
        const radioGroup = await screen.findByTestId("asset-card-form-name");
        user.click(radioGroup.children[0]);
        await waitFor(async () => {
            expect(mockSetter).toHaveBeenCalledWith({
                ...getMockCard(),
                has_name_field: true,
            });
        });
    });

    test("Should call setCard when de-activating NameField", async () => {
        render(
            <AssetCardForm
                card={{ ...getMockCard(), has_name_field: true }}
                setCard={mockSetter}
            />
        );
        const radioGroup = await screen.findByTestId("asset-card-form-name");
        user.click(radioGroup.children[1]);
        await waitFor(async () => {
            expect(mockSetter).toHaveBeenCalledWith({
                ...getMockCard(),
                has_name_field: false,
            });
        });
    });
});

describe("Testing setCard-Prop in Title Input", async () => {
    const mockSetter = vi.fn();

    beforeEach(() => {
        cleanup();
    });

    test("Should call setCard when typing into Title Input", async () => {
        const userInput = "My Title";
        render(<AssetCardForm card={getMockCard()} setCard={mockSetter} />);
        const titleInput = await screen.findByTestId("asset-card-form-title");
        fireEvent.change(titleInput, { target: { value: userInput } });

        await waitFor(async () => {
            expect(mockSetter).toHaveBeenCalledWith({
                ...getMockCard(),
                title: userInput,
            });
        });
    });
});

describe("Testing setCard-Prop in Description Input", async () => {
    const mockSetter = vi.fn();

    beforeEach(() => {
        cleanup();
    });

    test("Should call setCard when typing into Description Input", async () => {
        const userInput = "My Description";
        render(<AssetCardForm card={getMockCard()} setCard={mockSetter} />);
        const titleInput = await screen.findByTestId(
            "asset-card-form-description"
        );
        fireEvent.change(titleInput, { target: { value: userInput } });

        await waitFor(async () => {
            expect(mockSetter).toHaveBeenCalledWith({
                ...getMockCard(),
                description: userInput,
            });
        });
    });
});

describe("Testing AssetCard-Form Properties", async () => {
    const mockSetter = vi.fn();
    const properties = [
        {
            description: "Description 1",
            indents: 1,
            title: "Title 1",
            is_upgradeable: false,
        },
        {
            description: "Description 2",
            indents: 2,
            title: "Title 2",
            is_upgradeable: false,
        },
        {
            description: "Description 3",
            indents: 3,
            title: "Title 3",
            is_upgradeable: false,
        },
    ];

    beforeEach(() => {
        cleanup();
        mockSetter.mockClear();
    });

    test("Should render 3 properties", async () => {
        render(
            <AssetCardForm
                card={{
                    ...getMockCard(),
                    properties: properties,
                }}
                setCard={mockSetter}
            />
        );
        const propertyForms = await screen.findAllByTestId(
            "asset-card-form-property"
        );
        expect(propertyForms.length).toBe(3);
    });

    test("Should remove property on button click", async () => {
        render(
            <AssetCardForm
                card={{
                    ...getMockCard(),
                    properties: properties,
                }}
                setCard={mockSetter}
            />
        );
        const removeButtons = await screen.findAllByTestId(
            "asset-card-form-property-remove"
        );
        expect(removeButtons.length).toBe(3);

        fireEvent.click(removeButtons[2]);

        await waitFor(async () => {
            expect(mockSetter).toHaveBeenCalledWith({
                ...getMockCard(),
                properties: properties.splice(0, 2),
            });
        });
    });

    test("Should render indents options and fire its onChange event with the changed card", async () => {
        const user = userEvent.setup();

        const options = ["No Indent", "1 Indent", "2 Indents", "3 Indents"];

        for (const option of options) {
            let expectedValue = parseInt(option.charAt(0));
            if (option === options[0]) {
                expectedValue = 0;
            }
            cleanup();
            await test_ant_select_on_change_event(
                {
                    ...getMockCard(),
                    properties: [
                        {
                            ...getMockCard().properties[0],
                            indents: !expectedValue ? 1 : 0,
                        },
                    ],
                },
                mockSetter,
                "asset-card-form-property-indents",
                option,
                user
            );

            await waitFor(async () => {
                expect(mockSetter).toHaveBeenCalledWith({
                    ...getMockCard(),
                    properties: [
                        {
                            ...getMockCard().properties[0],
                            indents: expectedValue,
                        },
                    ],
                });
            });
        }
    });

    test("Should render upgradeable options and fire its onChange event with the changed card", async () => {
        const user = userEvent.setup();

        const options = ["Can be upgraded", "Can not be upgraded"];

        for (const option of options) {
            const expectedValue = option === options[0] ? true : false;
            cleanup();
            await test_ant_select_on_change_event(
                {
                    ...getMockCard(),
                    properties: [
                        {
                            ...getMockCard().properties[0],
                            is_upgradeable: expectedValue ? false : true,
                        },
                    ],
                },
                mockSetter,
                "asset-card-form-property-upgrade",
                option,
                user
            );

            await waitFor(async () => {
                expect(mockSetter).toHaveBeenCalledWith({
                    ...getMockCard(),
                    properties: [
                        {
                            ...getMockCard().properties[0],
                            is_upgradeable: expectedValue,
                        },
                    ],
                });
            });
        }
    });

    test("Should call setCard when typing into Properties Title Input", async () => {
        const userInput = "My Title";
        render(<AssetCardForm card={getMockCard()} setCard={mockSetter} />);
        const titleInput = await screen.findByTestId(
            "asset-card-form-property-title"
        );
        fireEvent.change(titleInput, { target: { value: userInput } });

        await waitFor(async () => {
            expect(mockSetter).toHaveBeenCalledWith({
                ...getMockCard(),
                properties: [
                    {
                        ...getMockCard().properties[0],
                        title: userInput,
                    },
                ],
            });
        });
    });

    test("Should call setCard when typing into Properties Description Input", async () => {
        const userInput = "My Title";
        render(<AssetCardForm card={getMockCard()} setCard={mockSetter} />);
        const titleInput = await screen.findByTestId(
            "asset-card-form-property-description"
        );
        fireEvent.change(titleInput, { target: { value: userInput } });

        await waitFor(async () => {
            expect(mockSetter).toHaveBeenCalledWith({
                ...getMockCard(),
                properties: [
                    {
                        ...getMockCard().properties[0],
                        description: userInput,
                    },
                ],
            });
        });
    });
});
