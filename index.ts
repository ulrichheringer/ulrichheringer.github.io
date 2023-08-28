const canvas = <HTMLCanvasElement>document.getElementById("simulation");
const ctx = canvas.getContext("2d");

function generateUUID() {
    let d = new Date().getTime();
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
    );
    return uuid;
}

function randomSort(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        let k = array[i];
        array[i] = array[j];
        array[j] = k;
    }
    return array;
}

// function uuidv4() {
//     return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
//         (
//             c ^
//             (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
//         ).toString(16)
//     );
// }

class Species {
    private males: any[] = [];
    private females: any[] = [];
    private color: string;
    constructor(color: string) {
        this.color = color;
        while (true) {
            let male = new Personagem(this.color);
            if (male.sex != false) {
                continue;
            }
            this.males.push(male);
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            const mili = now.getMilliseconds();
            console.log(
                "Impresso @ generate:",
                hours +
                    ":" +
                    minutes +
                    ":" +
                    seconds +
                    ":" +
                    mili +
                    ", machos:",
                this.males
            );
            break;
        }
        while (true) {
            let female = new Personagem(this.color);
            if (female.sex == false) {
                continue;
            }
            this.females.push(female);
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            const mili = now.getMilliseconds();
            console.log(
                "Impresso @ generate:",
                hours +
                    ":" +
                    minutes +
                    ":" +
                    seconds +
                    ":" +
                    mili +
                    ", femeas:",
                this.females
            );
            break;
        }
        //this.generate();
        console.log("generated one male and one female");
        //this.procriate();
        this.males = randomSort(this.males);
        this.females = randomSort(this.females);
        let child = this.males[0].createChild(this.females[0]);
        if (child == null) {
            this.procriate();
            return;
        }
        if (child.sex == true) {
            this.females.push(child);
        } else {
            this.males.push(child);
        }
    }
    print() {
        console.log(this.males);
        console.log(this.females);
    }
    procriate() {
        this.males = randomSort(this.males);
        this.females = randomSort(this.females);
        let child = this.males[0].createChild(this.females[0]);
        if (child == null) {
            this.generate();
            this.procriate();
            return;
        }
        if (child.sex == true) {
            this.females.push(child);
        } else {
            this.males.push(child);
        }
    }
    generate() {
        let male = new Personagem(this.color);
        if (male.sex != false) {
            this.generate();
            return;
            // male = new Personagem(this.color);
        }

        this.males.push(male);
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        let mili = now.getMilliseconds();
        console.log(
            "Impresso @ generate:",
            hours + ":" + minutes + ":" + seconds + ":" + mili + ", machos:",
            this.males
        );
        let female = new Personagem(this.color);
        while (female.sex == false) {
            female = new Personagem(this.color);
        }
        this.females.push(female);
        now = new Date();
        hours = now.getHours();
        minutes = now.getMinutes();
        seconds = now.getSeconds();
        mili = now.getMilliseconds();
        console.log(
            "Impresso @ generate:",
            hours + ":" + minutes + ":" + seconds + ":" + mili + ", femeas:",
            this.females
        );
    }
    age() {
        let numberdraw = 0;
        for (let i = 0; i < this.males.length; i++) {
            // if (this.males[i].canibal == true) {
            //     this.males.splice(-1, 1);
            //     console.log("killed someone");
            //     return;
            // }
            if (this.males[i] == null) {
                console.log("everyone died?");
            }
            this.males[i].next();
            if (this.males[i].isDead) {
                // let id = this.males[i].id;
                this.males[i] = null;
                this.males.splice(i, 1);
                // console.log(id, "has died");
            }
            if (this.males[i]) {
                numberdraw += 1;
                this.males[i].draw();
            }
        }
        for (let i = 0; i < this.females.length; i++) {
            this.females[i].next();
            if (this.females[i].isDead) {
                // let id = this.females[i].id;
                this.females[i] = null;
                this.females.splice(i, 1);
                // console.log(id, "has died");
            }
            if (this.females[i]) {
                numberdraw += 1;
                this.females[i].draw();
            }
        }
        this.males = randomSort(this.males);
        this.females = randomSort(this.females);
        let length = this.males.length >= 2 ? this.males.length / 2 : 1;
        if (length > 1) length = length % 2 === 0 ? length : length - 1;
        for (let i = 0; i < length; i++) {
            if (!this.males[i]) continue;
            if (this.females[i]) {
                let child = this.males[i].createChild(this.females[i]);
                if (child == null) continue;
                if (child.sex == true) {
                    this.females.push(child);
                } else {
                    this.males.push(child);
                }
            }
        }
    }
    getPopulation() {
        return this.males.length + this.females.length;
    }
    analyze() {
        let population = this.males.concat(this.females);
        if (population.length < 1) return;
        let genes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        let maxNumber = 0;
        let common = null;
        let sum = 0;
        for (let i = 0; i < population.length; i++) {
            for (let j = 3; j < population[i].genes.length - 1; j++) {
                genes[population[i].genes[j]] += 1;
            }
        }
        for (let gene = 0; gene < genes.length; gene++) {
            if (genes[gene] > maxNumber) {
                maxNumber = genes[gene];
                common = gene;
            }
            sum += genes[gene];
        }
        return {
            genes,
            gene: common,
            quantity: maxNumber,
            total: sum,
        };
    }
}

function prettyPrint(species: Species) {
    let toAnalyze = species.analyze();
    if (toAnalyze === undefined) return "nothing to analyze";
    return (
        "O gene mais comum foi o gene do tipo '" +
        toAnalyze?.gene +
        "' com: " +
        toAnalyze?.quantity +
        " genes, de um total de: " +
        toAnalyze?.total +
        ", o que corresponde a: " +
        parseFloat(
            ((toAnalyze?.quantity / toAnalyze?.total) * 100).toFixed(2)
        ) +
        "%."
    );
}

class Personagem {
    private isDead: boolean = false;
    private id = generateUUID();
    private color: string;
    private x: number;
    private y: number;
    private vegetarian: boolean | null = null;
    private procriate: boolean | null = null; // Boolean
    public sex: boolean | null = null; // Boolean
    private canibal: boolean = false; // Boolean
    private necessity = 10; // Número float randômico
    private procriate_rate = 1;
    private death_rate = 1; // Número float randômico
    private lifetime = Math.floor(Math.random() * 60 + 40); // Número int randômico
    private age: number = 0;
    private food_finding = Math.random() * 2;
    private genes = new Array(8);
    private children = new Array();

    constructor(color: string) {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        let mili = now.getMilliseconds();
        // console.log(
        //     "Comecei a gerar:",
        //     hours + ":" + minutes + ":" + seconds + ":" + mili + ", id:",
        //     this.id
        // );
        this.x = Math.floor(Math.random() * 950) + 70;
        this.y = Math.floor(Math.random() * 550) + 70;
        this.color = color;
        // for(let i = 0; i<array.length;i++){array[i]=Math.floor(Math.random()*9);}
        for (let i = 0; i < this.genes.length; i++) {
            let random = Math.floor(Math.random() * 9);
            //if (i == 1) random = Math.floor(Math.random() * 6);
            if (i == 0 || i == 2) random = Math.floor(Math.random() * 2);
            this.genes[i] = random;
        }
        this.process();
    }
    draw() {
        if (ctx == null) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    process() {
        switch (this.genes[0]) {
            case 0:
                this.genes[0] = 0;
                this.vegetarian = true;
                break;
            default:
                this.genes[0] = 1;
                this.vegetarian = false;
                break;
        }
        switch (this.genes[1]) {
            case 0:
                this.genes[1] = 0;
                this.procriate = false;
                break;
            default:
                this.genes[1] = 1;
                this.procriate = true;
                break;
        }
        switch (this.genes[2]) {
            case 0:
                this.genes[2] = 0;
                this.sex = false;
                break;
            default:
                this.genes[2] = 1;
                this.sex = true;
                break;
        }
        for (let i = 3; i < this.genes.length; i++) {
            switch (this.genes[i]) {
                case 0:
                    this.canibal = !this.canibal;
                    break;
                case 1:
                    this.necessity -= this.necessity * Math.random();
                    break;
                case 2:
                    this.necessity += this.necessity * Math.random();
                    break;
                case 3:
                    this.procriate_rate += this.procriate_rate * Math.random();
                    break;
                case 4:
                    this.death_rate += this.death_rate * Math.random();
                    break;
                case 5:
                    this.lifetime += this.lifetime * Math.random();
                    break;
                case 6:
                    this.lifetime -= this.lifetime * Math.random() * 1.6;
                    break;
                case 7:
                    this.food_finding += this.food_finding * Math.random();
                    break;
                case 8:
                    this.food_finding -= this.food_finding * Math.random();
                    break;
                default:
                    console.log("default:", this.genes[i]);
                    break;
            }
        }
        //console.log(this.genes);
    }
    createChild(female: any) {
        if (this.sex != false) return;
        if (this.procriate == false) {
            // console.log("male cant procriate");
            return;
        }
        if (female.sex == false) return;
        if (female.procriate == false) {
            // console.log("female cant procriate");
            return;
        }
        let child = new Personagem(this.color);
        if (this.vegetarian != female.vegetarian) {
            // console.log("mom and dad are different");
            let dadOrMom = Math.random();
            if (dadOrMom < 0.5) {
                // console.log("dad won");
                child.vegetarian = this.vegetarian;
            } else {
                // console.log("mom won");
                child.vegetarian = female.vegetarian;
            }
        } else {
            child.vegetarian = this.vegetarian;
        }
        child.genes[0] = child.vegetarian ? 0 : 1;
        let dadGenes = child.genes.splice(3, 2);
        child.genes[6] = child.genes[3];
        child.genes[7] = child.genes[4];
        child.genes[8] = child.genes[5];
        child.genes[3] = 0;
        child.genes[4] = 0;
        child.genes[5] = 0;
        let momGenes = child.genes.splice(5, 2);
        let temp = child.genes[5];
        child.genes[5] = 0;
        child.genes[6] = 0;
        child.genes[7] = temp;
        //console.log(child.genes);
        //return;
        dadGenes = randomSort(this.genes.slice(3, 8)).splice(0, 2);
        momGenes = randomSort(female.genes.slice(3, 8)).splice(0, 2);
        child.genes[3] = dadGenes[0];
        child.genes[4] = dadGenes[1];
        child.genes[5] = momGenes[0];
        child.genes[6] = momGenes[1];
        this.children.push(child);
        female.children.push(child);
        return child;
    }
    next() {
        // console.log(this.id, "has aged");
        this.age += 1;
        if (this.age >= this.lifetime) {
            this.isDead = true;
            return;
        }
        let chance = (Math.random() * 20 + 10) * this.food_finding * 1.3;
        if (this.necessity >= chance) {
            this.isDead = true;
            return;
        }
        if (this.death_rate >= Math.random() * 2 + 1.0) {
            // console.log("died by death rate");
            return;
        }
    }
}

let s1 = new Species("black");
let s2 = new Species("blue");
let s3 = new Species("green");
let s4 = new Species("yellow");
let s5 = new Species("grey");
for (let i = 0; i <= 100; i++) {
    ctx?.clearRect(0, 0, 1100, 650);
    s1.age();
    s2.age();
    s3.age();
    s4.age();
    s5.age();
}
let c1 = document.createTextNode(
    "Espécie um tem: " + s1.getPopulation() + " seres, "
);
let c2 = document.createTextNode(
    "Espécie dois tem: " + s2.getPopulation() + " seres, "
);
let c3 = document.createTextNode(
    "Espécie três tem: " + s3.getPopulation() + " seres, "
);
let c4 = document.createTextNode(
    "Espécie quatro tem: " + s4.getPopulation() + " seres, "
);
let c5 = document.createTextNode(
    "Espécie cinco tem: " + s5.getPopulation() + " seres."
);
let ph = document.getElementById("placeholder");
ph?.appendChild(c1);
ph?.appendChild(c2);
ph?.appendChild(c3);
ph?.appendChild(c4);
ph?.appendChild(c5);
let analytics = document.getElementById("analytics");
console.log(prettyPrint(s1));
console.log(prettyPrint(s2));
console.log(prettyPrint(s3));
console.log(prettyPrint(s4));
console.log(prettyPrint(s5));
let a1 = document.createTextNode(prettyPrint(s1));
let a2 = document.createTextNode(prettyPrint(s2));
let a3 = document.createTextNode(prettyPrint(s3));
let a4 = document.createTextNode(prettyPrint(s4));
let a5 = document.createTextNode(prettyPrint(s5));
let newline = document.createElement("p");
newline.innerHTML = "Data:";
ph?.appendChild(newline);
ph?.appendChild(a1);
let n2 = document.createElement("p");
ph?.appendChild(n2);
ph?.appendChild(a2);
let n3 = document.createElement("p");
ph?.appendChild(n3);
ph?.appendChild(a3);
let n4 = document.createElement("p");
ph?.appendChild(n4);
ph?.appendChild(a4);
let n5 = document.createElement("p");
ph?.appendChild(n5);
ph?.appendChild(a5);

// Personagem tem que encontrar comida
// Personagem tem genes, um array de 8 genes, genes são simbolizados por números
// Gene[0]: Gene que define se é vegetariano, valores vão de 0 a 9, sendo 0 vegetariano
// Gene[1]: Gene que define se procria, valores vão de 0 a 9, sendo 0 não poder procriar
// Gene [2]: Homem ou mulher, valores vão de 0 a 1, sendo 0 Homem e 1 Mulher
// Gene[3] a Gene [7]: define caracteristicas variadas, que se somam para aumentar a chance daquela caracteristica, valores vão de 0 a 9.
// Tipo de gene 0 -> Canibal
// Tipo de Gene 1 -> Menos necessidade de comer
// Tipo de Gene 2 -> Mais necessidade de comer
// Tipo de Gene 3 -> Procria mais, com um valor random definido na hora.
// Tipo de Gene 4 -> Mais chance de morrer
// Tipo de Gene 5 -> Vive mais tempo.
// Tipo de Gene 6 -> Vive menos tempo.
// Tipo de Gene 7 -> Facilidade para achar comida.
// Tipo de gene 8 -> Dificuldade de achar comida.

// [0,0,0,1,1,1,1,1]
// O tipo 0 nesse caso aí, é de que é um espaço reservado para um gene "especial": que define o sexo, se é vegetariano ou se pode procriar
// O tipo 1 são genes aleatórios, aqueles de canibal, viver mais ou menos tempo e tals.
// O gene que define se é vegetariano sempre passa para os filhos. (tipo 0)
// O gene que define se procria ou não, não se passa, pois é uma mutação. (tipo 0)
// 4 genes serão passados para o filho, de forma aleatória. (os genes do tipo 1)
