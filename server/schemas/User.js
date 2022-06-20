({
    id: { type: 'uuid', primaryKey: true },
    email: { type: 'char', unique: true },
    password: 'char',
    created: 'datetime',
})
