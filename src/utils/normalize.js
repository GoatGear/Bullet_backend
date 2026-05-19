// Strip userId, __v; rename _id → id. Works for plain objects from .lean()

export function norm(doc) {
  if (!doc) return null
  // eslint-disable-next-line no-unused-vars
  const { _id, __v, userId, ...rest } = doc
  return { id: _id.toString(), ...rest }
}

export function normMany(docs) {
  return docs.map(norm)
}

// For documents with a single level of embedded subdoc arrays
export function normNested(doc, ...arrayKeys) {
  const base = norm(doc)
  for (const key of arrayKeys) {
    if (Array.isArray(base[key])) {
      base[key] = base[key].map(sub => {
        if (!sub || !sub._id) return sub
        // eslint-disable-next-line no-unused-vars
        const { _id, __v, ...rest } = sub
        return { id: _id.toString(), ...rest }
      })
    }
  }
  return base
}
