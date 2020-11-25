import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';

//de rnc functional

// const FunctionalComp = ({
//     params,
// }) => (
// <View>
//     <Text>FunctionalComp</Text>
// </View>
// );

// export default FunctionalComp;

// ****

// otro estilo

// const FunctionalComp = () => {
//     const [value, setValue] = React.useState('');

//     const onChange = event => setValue(event.target.value);

//     return (
//         <View>
//             <Text>FunctionalComp</Text>
//         </View>
//     );
// };

// export default FunctionalComp;

// ****

// del curso https://www.robinwieruch.de/react-function-component


// function FunctionalComp() {
//   const greeting = 'Hello Function Component!';

//   return <Text>{greeting}</Text>
// }

// export default FunctionalComp;

//

//extrae headline COMPOSITION
// function FunctionalComp() {
//     return <Headline />;
//   }

//   //ahora headline es un componenete
//   function Headline() {
//     const greeting = 'Hello Function Component!';

//     return <Text>{greeting}</Text>
//   }

//   export default FunctionalComp;


// WITH PROPS

//   function FunctionalComp() {
//     const greeting = 'Hello Function Component tkt ss9!';

//     return <Headline myValor={greeting} />;
//   }

//   function Headline(props) {
//     return <Text>{props.myValor}</Text>;
//   }

//   export default FunctionalComp;

//PROPS CON DESTRUCTURING

//   function FunctionalComp() {
//     const greeting = 'Hello Function Component!';

//     return <Headline value={greeting} />;
//   }

//   function Headline({ value }) {
//     return <Text>{value}</Text>;
//   }

//   export default FunctionalComp;

//ARROW FUNCTION COMPONENT
//   const FunctionalComp = () => {
//     const greeting = 'Hello Function Component!';

//     return <Headline value={greeting} />;
//   };

//   const Headline = ({ value }) => {
//     return <Text>{value}</Text>;
//   };

//   export default FunctionalComp;

//SIMPLIFY, no return

//   const FunctionalComp = () => {
//     const greeting = 'Hello Function Component!';

//     return <Headline value={greeting} />;
//   };

//   const Headline = ({ value }) =>
//     <Text>{value}</Text>;

//   export default FunctionalComp;

// extrae headline again, 

//   const FunctionalComp = () => {
//     return <Headline />;
//   };

//   const Headline = () => {
//     const greeting = 'Hello Function Component!';

//     return <Text>{greeting}</Text>;
//   };

//   export default FunctionalComp;


//FUNCTION WITH STATE! state hook
// const App = () => {
//     return <Headline />;
// };

// const Headline = () => {
//     const [greeting, setGreeting] = useState(
//         'Hello Function Component345!'
//     );

//     return <Text>{greeting}</Text>;
// };

// export default App;

/// with input changeable

// const FunctionalComp = () => {
//     return <Headline />;
//   };

//   const Headline = () => {
//     const [greeting, setGreeting] = useState(
//       'Hello Function Component!'
//     );

//     return (
//       <View>
//         <Text>{greeting}</Text>

//         <TextInput
//           type="text"
//           value={greeting}
//           onChange={event => setGreeting(event.target.value)}
//         />
//       </View>
//     );
//   };

//   export default FunctionalComp;

//

const App = () => {
    return <Headline />;
};

const Headline = () => {
    const [greeting, setGreeting] = useState(
        'Hello Function Component!'
    );

    const [text, setText] = useState('');


    const handleChange = event => setGreeting(event.target.value);

    return (
        <View>
            <Text>{text}</Text>

            <TextInput
                style={{ height: 40 }}
                placeholder="Type here to translate!"
                onChangeText={text => setText(text)}
                defaultValue={text}
            />
        </View>
    );
};

export default App;