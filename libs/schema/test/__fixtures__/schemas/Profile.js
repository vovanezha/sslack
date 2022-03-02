({
    id: { type: 'uuid', primaryKey: true },
    name: 'char',
    surname: 'char',
    avatar: 'char',

    user: { foreignKey: 'User' },
})
