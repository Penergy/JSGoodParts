import { sayHello } from "./greet";

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = sayHello(name);
}

function test() {
    document.writeln('Hello, World!');
}

showHello("greeting", "TypeScript");
test();