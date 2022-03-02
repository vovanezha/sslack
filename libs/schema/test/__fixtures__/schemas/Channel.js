({
    id: 'uuid',
    name: 'char',
    description: { type: 'char', nullable: true },

    workspace: { foreignKey: 'Workspace' },
    profile: { foreignKey: 'Profile' },
})
