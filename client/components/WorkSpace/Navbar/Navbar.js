import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

const NavbarStd = () => {
    return (
        <div>
            <Navbar isBordered>
                <NavbarBrand>
                    <p className="font-bold text-inherit">ห้องเรียนเขียนโค้ด</p>
                </NavbarBrand>
               
                <NavbarContent justify="end">
                   
                    <NavbarItem>
                        <Button
                        size="md"
                        className='px-12'
                            color="danger"
                            variant="shadow">
                            Leav
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </div>
    )
}

export default NavbarStd