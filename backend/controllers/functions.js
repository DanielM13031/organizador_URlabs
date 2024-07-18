const items = [
    {id: 1, name: 'Leds', quantity: 300},
    {id: 2, name: 'Jumpers', quantity: 783},
    {id: 3, name: 'Arduinos', quantity: 125},
];

const Compovault_s = [];

const users = [
    {id: 1, name: 'Juan Esteban Torres', username: 'juanes.torres', password: '678910', role: 'teacher'},
    {id: 2, name: 'Daniel José Morales', username: 'daniel.morales', password: '123456', role: 'student'},
];

const requests = [];


const loginUser = (req, res) => {
    res.json({
        title : 'URlabs',
        text : 'Por favor, inicie sesión para continuar'
    });
}


const products = (req, res, next) => {
    res.json({
        title : 'URlabs',
        text : 'Lista de componentes:',
        items: items
    });
}


const loan = (req, res, next) => {
    res.json({
        title : 'URlabs',
        text : 'Lista de componentes disponibles para el préstamo:',
        items: items
    });
}


const loginTeacher = (req, res) => {
    const user = req.session.user;
    res.json({
        title : 'URlabs',
        text : 'Bienvenido al administrador del inventario de URlabs',
        user: user
    });
}


const loginStudent = (req, res) => {
    const user = req.session.user;
    res.json({
        title : 'URlabs',
        text : 'Bienvenido al servicio de préstamo de URlabs para estudiantes',
        user: user
    });
}


const myCompovault = (req, res) => {
    const user = req.session.user;
    const compovault = Compovault_s.find(cv => cv.usuarioId === user.id);

    if (!compovault) {
        req.flash('error', 'No encontramos tu Compovault. Selecciona los componentes deseados.');
        return res.redirect('/loan');
    }

    res.json({
        title: 'URlabs',
        text: 'Tu Compovault:',
        compovault: compovault
    });
}


const seeRequest = (req, res) => {
    if (requests.length === 0) {
        res.json({
            title: 'URlabs',
            text: 'No se encontraron solicitudes de préstamos activos',
            requests: requests
        });
    } else {
        res.json({
            title: 'URlabs',
            text: 'Solicitudes de préstamos activos:',
            requests: requests
        });
    }
}


const reviewRequest = (req, res) => {
    const requestId = parseInt(req.query.requestId);
    const request = requests.find(req => req.id === requestId);

    if (!request) {
        req.flash('error', 'No se encontró la solicitud de préstamo.');
        return res.redirect('/see_request');
    }

    res.json({
        title: 'URlabs',
        text: 'Detalles de la Solicitud de Préstamo',
        request: request
    });
}


const newProduct = (req, res, next) => {
    const { newitem } = req.body;
    const newItemLower = newitem.toLowerCase();
    const existingItem = items.find(item => item.name.toLowerCase() === newItemLower);
    
    if (existingItem) {
        res.json({
            title: 'URlabs',
            text: 'Lista de productos',
            items: items,
            error: 'Este objeto ya está en la lista'
        });
        return;
    }

    items.push({
        id: items.length + 1, 
        name: newitem,
        quantity: 0
    });

    res.redirect('/products');
}


const deleteProduct = (req, res, next) => {
    const { id } = req.body;
    const itemId = parseInt(id);

    const itemIndex = items.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
        items.splice(itemIndex, 1);
    }

    res.redirect('/products');
}


const updateQuantity = (req, res) => {
    const { id, quantity } = req.body;
    const item = items.find(item => item.id == id);
    if (item) {
        const newQuantity = item.quantity + parseInt(quantity);
        if (newQuantity <= 999 ) {
            item.quantity = newQuantity;
        } else {
            res.json({
                title: 'URlabs',
                text: 'Lista de productos',
                items: items,
                error: 'La cantidad no puede exceder de 999'
            });
            return; 
        }
    }
    res.redirect('/products');
}


const deleteQuantity = (req, res) => {
    const { id, quantity } = req.body;
    const item = items.find(item => item.id == id);
    if (item) {
        item.quantity -= quantity;
        if (item.quantity < 0) {
            item.quantity = 0;
        }
    }
    res.redirect('/products');
}


const verifyUser = (req, res) => {
    const { username, password } = req.body;
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        req.session.user = user;
        res.redirect('/verify_role');
    } else {
        req.flash('error', 'El usuario o la clave son incorrectos');
        res.redirect('/');
    }
}


const verifyRole = (req, res) => {
    const user = req.session.user;

    if (user) {
        if (user.role === 'teacher') {
            res.redirect('/teacher');
        } else if (user.role === 'student') {
            res.redirect('/student');
        } else {
            req.flash('error', 'Rol no encontrado');
            res.redirect('/');
        }
    } else {
        req.flash('error', 'Inicie sesión para continuar');
        res.redirect('/');
    }
}


const logOut = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
}


const addCompovault = (req, res) => {
    const user = req.session.user;
    const componenteId = parseInt(req.body.id); 
    const cantidad = parseInt(req.body.quantity); 

    const componente = items.find(item => item.id === componenteId);

    if (cantidad > componente.quantity) {
        req.flash('error', 'No hay cantidad suficiente del componente');
        res.redirect('/loan');
        return;
    }

    let compovault = Compovault_s.find(cv => cv.usuarioId === user.id);

    if (!compovault) {
        compovault = {
            nombre: `Compovault de ${user.name}`,
            usuarioId: user.id,
            componentes: []
        };
        Compovault_s.push(compovault);
    }

    let existingComponent = compovault.componentes.find(c => c.id === componente.id);

    if (existingComponent) {
        const nuevaCantidad = existingComponent.cantidad + cantidad;
        if (nuevaCantidad > 999) {
            req.flash('error', 'No puedes tener más de 999 unidades de este componente.');
            return res.redirect('/loan');
        }
        existingComponent.cantidad = nuevaCantidad;
    } else {
        if (cantidad > 999) {
            req.flash('error', 'No puedes tener más de 999 unidades de este componente.');
            return res.redirect('/loan');
        }
        compovault.componentes.push({
            id: componente.id,
            nombre: componente.name,
            cantidad: cantidad
        });
    }

    componente.quantity -= cantidad;

    req.flash('success', 'Componente(s) agregado(s) al Compovault');
    res.redirect('/loan');
}


const loanRequest = (req, res) => {
    const user = req.session.user;

    const compovault = Compovault_s.find(cv => cv.usuarioId === user.id);
    const existingRequest = requests.find(req => req.usuarioId === user.id);

    const currentDate = new Date().toLocaleDateString();

    if (existingRequest) {
        req.flash('error', 'Ya tienes una solicitud de préstamo pendiente.');
        return res.redirect('/my_compovault');
    }

    requests.push({
        id: requests.length + 1,
        usuarioId: user.id,
        compovault: compovault,
        date: currentDate
    });

    req.flash('success', 'Solicitud de préstamo enviada con éxito, será informado en X días hábiles.');
    res.redirect('/student');
}

module.exports = {
    loginUser,
    products,
    loan,
    loginTeacher,
    loginStudent,
    myCompovault,
    seeRequest,
    reviewRequest,
    newProduct,
    deleteProduct,
    updateQuantity,
    deleteQuantity,
    verifyUser,
    verifyRole,
    logOut,
    addCompovault,
    loanRequest,
}
