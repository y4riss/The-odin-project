
export default function navComponent()
{
    const nav = document.createElement("nav");
    const homeBtn = document.createElement("button")
    const menuBtn = document.createElement("button")
    const contactBtn = document.createElement("button")

    homeBtn.textContent = "Home";
    menuBtn.textContent = "Menu";
    contactBtn.textContent = "Contact";

    nav.append(homeBtn,menuBtn,contactBtn)
    return nav;
}