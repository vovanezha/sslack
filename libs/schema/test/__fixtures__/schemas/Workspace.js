({
    id: 'uuid',
    name: 'char',
    description: {type: 'char', nullable: true},

    profile: {foreignKey: 'Profile'},
})
