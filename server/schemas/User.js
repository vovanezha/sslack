({
    id: { type: 'uuid', primaryKey: true },
    login: { type: 'char', unique: true },
    password: 'char',
    created: 'datetime',
})
