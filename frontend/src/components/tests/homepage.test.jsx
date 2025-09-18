import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { Homepage } from "../homepage/homepage";
import '@testing-library/jest-dom'
import { Button } from "react-bootstrap";

describe('Homepage tests', ()=>{

    it('renders title', ()=>{
        render(<Homepage/>)

        expect(screen.getByText('CRUD EN REACT')).toBeInTheDocument()
        expect(screen.getByText("There are no records to display")).toBeInTheDocument()
    })

    it('renders datas with items', async ()=>{

        const response = [{id: "1", value: "John Doe"}]

        globalThis.fetch = vi.fn().mockResolvedValueOnce({
            json: async () => response
        })

        render(<Homepage/>)

        await waitFor(()=>{
            expect(screen.getByText(response[0].value)).toBeInTheDocument()
        })
    })

    it('render the form', ()=>{
        render(<Homepage />)

        expect(screen.getByTestId('formulaire')).toBeInTheDocument()
    })

    it('render the new data', async ()=>{

        render(<Homepage />)

        const inputField = screen.getByRole('textbox', {name: /insérez votre donnée/i})
        const submitButton = screen.getByRole('button', {name: /envoyer/i})

        await userEvent.type(inputField, "donnée de test")
        await userEvent.click(submitButton)

        expect(globalThis.fetch).toHaveBeenCalledTimes(1)

        screen.debug()
    })
    
})