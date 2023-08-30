# Simulação Natural/Artificial
###### Feita com Javascript, HTML e CSS.
## Algumas regras básicas:
- Personagem tem genes, um array de 8 genes, genes são simbolizados por números
- Gene[0]: Gene que define se é vegetariano, valores vão de 0 a 9, sendo 0 vegetariano
- Gene[1]: Gene que define se procria, valores vão de 0 a 9, sendo 0 não poder procriar
- Gene [2]: Homem ou mulher, valores vão de 0 a 1, sendo 0 Homem e 1 Mulher
- Gene[3] a Gene [7]: define caracteristicas variadas, que se somam para aumentar a chance daquela caracteristica, valores vão de 0 a 9.
- Tipo de gene 0 -> Canibal, Obs: Não foi implementado
- Tipo de Gene 1 -> Menos necessidade de comer
- Tipo de Gene 2 -> Mais necessidade de comer
- Tipo de Gene 3 -> Procria mais, com um valor random definido na hora.
- Tipo de Gene 4 -> Mais chance de morrer
- Tipo de Gene 5 -> Vive mais tempo.
- Tipo de Gene 6 -> Vive menos tempo.
- Tipo de Gene 7 -> Facilidade para achar comida.
- Tipo de gene 8 -> Dificuldade de achar comida.

> [0,0,0,1,1,1,1,1]

O tipo 0 nesse caso aí, é de que é um espaço reservado para um gene "especial": que define o sexo, se é vegetariano ou se pode procriar.

O tipo 1 são genes aleatórios, aqueles de canibal, viver mais ou menos tempo e tals.

O gene que define se é vegetariano sempre passa para os filhos. (tipo 0)

O gene que define se procria ou não, não se passa, pois é uma mutação. (tipo 0)

4 genes serão passados para o filho, de forma aleatória. (os genes do tipo 1)