import React from 'react';

// I tried a few opptions to move this out of alloy but was not coming up with a good immediate solution so letting this stay with a todo
// this applies to the reducer utility as well. That does not reference tio like this does but it is an opinionated way of handling reducer logic
// and begs the question of how opinionated we should be in alloy
// TODO: move tio specific utilities like this out of alloy utilities.
// Options:
// 1) repurpose core to be tio-app utilities
// 2) talk about (with rose) how opinionated we want to be alloy utilities
// 3) figure out why my adding it to the tenableio app was not allowing it to be imported into the other apps
const bindPresentationToContainer = (Presentation, Container) => {
    const BoundComponent = (presentationProps) => {
        const render = (containerProps) => {
            const renderProps = {
                ...containerProps,
                ...presentationProps
            };

            return (
                <Presentation {...renderProps} />
            );
        };

        return (
            <Container tioRender={render} />
        );
    };

    return BoundComponent;
};

export {
    bindPresentationToContainer
};
