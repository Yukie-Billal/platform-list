class HttpNotFound extends Error {
   constructor(message?: string) {
      super(message)
   }
}

class HttpBadRequest<E> extends Error {
   declare errors?: E

   constructor(message?: string, errors?: E) {
      super(message)
      this.errors = errors
   }
}

class HttpInternalError extends Error {
   constructor(message?: string) {
      super(message)
   }
}

export {
   HttpNotFound,
   HttpBadRequest,
   HttpInternalError
};