import { render, screen } from "@testing-library/react";
import { beforeEach, describe, it, vi } from "vitest";
import Formulaire from "../form/formv2";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";

describe('Form', ()=>{

    beforeEach(()=>{
        globalThis.fetch = vi.fn();
    })
    it('renders form text advice', ()=>{

        render(<Formulaire />)

        expect(screen.getByText('Insérez votre donnée')).toBeInTheDocument()
    })

})