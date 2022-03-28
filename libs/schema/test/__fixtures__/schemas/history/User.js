({
    id: { type: 'uuid', primaryKey: true },
    login: { type: 'char', unique: true },
    password: 'char',
    first_name: 'char',
    created: 'datetime',
})
