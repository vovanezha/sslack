({
  signup: (fields) => {
    return qb.in('User')
        .insert(fields)
        .resolve();
  }
})
