export enum UserStatusMessages {
    USER_RETRIEVED_SUCCESS = "Authenticated user data retrieved successfully.",
    USER_UPDATED_SUCCESS = "User information updated successfully.",
    ACCESS_HISTORY_RETRIEVED_SUCCESS = "Access history retrieved successfully.",
  }
  
  export enum ProductStatusMessages {
    PRODUCT_RETRIEVED_SUCCESS = "Product retrieved successfully.",
    PRODUCT_CREATED_SUCCESS = "Product created successfully.",
    PRODUCT_UPDATED_SUCCESS = "Product updated successfully.",
    PRODUCT_DELETED_SUCCESS = "Product deleted successfully.",
    PRODUCT_IDENTIFIER = "Identifier for the product.",
  }
  
  export enum OrderStatusMessages {
    ORDER_CREATED_SUCCESS = "Order created successfully.",
    ORDER_UPDATED_SUCCESS = "Order updated successfully.",
    PAYMENT_CALLBACK_PROCESSED_SUCCESS = "Payment callback processed successfully.",
    ORDER_IDENTIFIER = "Identifier for the order.",
  }
  
  export enum CategoryStatusMessages {
    CATEGORIES_RETRIEVED_SUCCESS = "Categories retrieved successfully.",
    CATEGORIES_DELETED_SUCCESS = "Categories deleted successfully.",
    CATEGORIES_UPDATED_SUCCESS = "Categories updated successfully.",
    CATEGORY_CREATED_SUCCESS = "Category created successfully.",
  }
  
  export enum CartStatusMessages {
    CART_ITEM_ADDED_SUCCESS = "Item added to cart successfully.",
    USER_CART_RETRIEVED_SUCCESS = "User's cart retrieved successfully.",
  }
  
  export enum AuthenticationMessages {
    SIGN_IN_SUCCESSFUL = "Sign-in was successful.",
    SIGN_UP_SUCCESSFUL = "Sign-up was successful.",
    SIGN_OUT_SUCCESSFUL = "Sign-out was successful.",
    TOKEN_REFRESH_SUCCESSFUL = "Token refreshed successfully.",
    FORGOT_PASSWORD_EMAIL_SENT = "Forgot password email sent successfully.",
    PASSWORD_RESET_SUCCESSFUL = "Password reset successfully.",
    JWT_AUTHORIZATION_TOKEN = "JWT authorization token.",
  }
  
  export enum PaginationStatusMessages {
    CURRENT_PAGE = "Current page number.",
    ITEM_LIMIT = "Maximum number of items per page.",
  }
  