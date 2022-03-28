({
    workspaceId: { type: 'uuid', primaryKey: true },
    name: 'char',
    description: { type: 'char', nullable: true },

    profile: { foreignKey: 'Profile' },
})
