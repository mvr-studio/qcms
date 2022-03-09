import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
import { ClientError } from 'graphql-request/dist/types';
import useSWR, { SWRConfiguration as SWRConfigInterface, Key as SWRKeyInterface } from 'swr';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  jwt: Scalars['String'];
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  products?: Maybe<Array<Maybe<Product>>>;
  updatedAt: Scalars['Date'];
};

export type CmsInfo = {
  __typename?: 'CmsInfo';
  schema?: Maybe<Scalars['JSON']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory?: Maybe<Category>;
  createOrder?: Maybe<Order>;
  createProduct?: Maybe<Product>;
  createUser?: Maybe<User>;
  deleteCategory?: Maybe<Category>;
  deleteOrder?: Maybe<Order>;
  deleteProduct?: Maybe<Product>;
  deleteUser?: Maybe<User>;
  logInUser?: Maybe<AuthResponse>;
  logOutUser?: Maybe<Scalars['JSON']>;
  registerUser?: Maybe<AuthResponse>;
  updateCategory?: Maybe<Category>;
  updateOrder?: Maybe<Order>;
  updateProduct?: Maybe<Product>;
  updateUser?: Maybe<User>;
};


export type MutationCreateCategoryArgs = {
  data?: InputMaybe<Scalars['JSON']>;
};


export type MutationCreateOrderArgs = {
  data?: InputMaybe<Scalars['JSON']>;
};


export type MutationCreateProductArgs = {
  data?: InputMaybe<Scalars['JSON']>;
};


export type MutationCreateUserArgs = {
  data?: InputMaybe<Scalars['JSON']>;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['String'];
};


export type MutationDeleteOrderArgs = {
  id: Scalars['String'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationLogInUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterUserArgs = {
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};


export type MutationUpdateCategoryArgs = {
  data?: InputMaybe<Scalars['JSON']>;
  id: Scalars['String'];
};


export type MutationUpdateOrderArgs = {
  data?: InputMaybe<Scalars['JSON']>;
  id: Scalars['String'];
};


export type MutationUpdateProductArgs = {
  data?: InputMaybe<Scalars['JSON']>;
  id: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  data?: InputMaybe<Scalars['JSON']>;
  id: Scalars['String'];
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  products?: Maybe<Array<Maybe<Product>>>;
  state?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
  user?: Maybe<User>;
};

export type Product = {
  __typename?: 'Product';
  category?: Maybe<Category>;
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  orders?: Maybe<Array<Maybe<Order>>>;
  price?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['Date'];
};

export type Query = {
  __typename?: 'Query';
  categories?: Maybe<Array<Maybe<Category>>>;
  categoryById?: Maybe<Category>;
  me?: Maybe<User>;
  orderById?: Maybe<Order>;
  orders?: Maybe<Array<Maybe<Order>>>;
  productById?: Maybe<Product>;
  products?: Maybe<Array<Maybe<Product>>>;
  qcms?: Maybe<CmsInfo>;
  userById?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryCategoriesArgs = {
  orderBy?: InputMaybe<Scalars['JSON']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type QueryCategoryByIdArgs = {
  id: Scalars['String'];
};


export type QueryOrderByIdArgs = {
  id: Scalars['String'];
};


export type QueryOrdersArgs = {
  orderBy?: InputMaybe<Scalars['JSON']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type QueryProductByIdArgs = {
  id: Scalars['String'];
};


export type QueryProductsArgs = {
  orderBy?: InputMaybe<Scalars['JSON']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};


export type QueryUserByIdArgs = {
  id: Scalars['String'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  orders?: Maybe<Order>;
  role?: Maybe<Role>;
  updatedAt: Scalars['Date'];
};

export type Categories_QueryQueryVariables = Exact<{
  orderBy?: InputMaybe<Scalars['JSON']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
}>;


export type Categories_QueryQuery = { __typename?: 'Query', categories?: Array<{ __typename?: 'Category', createdAt: any, id: string, name?: string | null, updatedAt: any, products?: Array<{ __typename?: 'Product', createdAt: any, description?: string | null, id: string, name?: string | null, price?: number | null, updatedAt: any } | null> | null } | null> | null };

export type CategoryById_QueryQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type CategoryById_QueryQuery = { __typename?: 'Query', categoryById?: { __typename?: 'Category', createdAt: any, id: string, name?: string | null, updatedAt: any, products?: Array<{ __typename?: 'Product', createdAt: any, description?: string | null, id: string, name?: string | null, price?: number | null, updatedAt: any } | null> | null } | null };

export type Me_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type Me_QueryQuery = { __typename?: 'Query', me?: { __typename?: 'User', createdAt: any, email: string, id: string, name?: string | null, role?: Role | null, updatedAt: any, orders?: { __typename?: 'Order', createdAt: any, id: string, state?: string | null, updatedAt: any } | null } | null };

export type OrderById_QueryQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type OrderById_QueryQuery = { __typename?: 'Query', orderById?: { __typename?: 'Order', createdAt: any, id: string, state?: string | null, updatedAt: any, products?: Array<{ __typename?: 'Product', createdAt: any, description?: string | null, id: string, name?: string | null, price?: number | null, updatedAt: any } | null> | null, user?: { __typename?: 'User', createdAt: any, email: string, id: string, name?: string | null, role?: Role | null, updatedAt: any } | null } | null };

export type Orders_QueryQueryVariables = Exact<{
  orderBy?: InputMaybe<Scalars['JSON']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
}>;


export type Orders_QueryQuery = { __typename?: 'Query', orders?: Array<{ __typename?: 'Order', createdAt: any, id: string, state?: string | null, updatedAt: any, products?: Array<{ __typename?: 'Product', createdAt: any, description?: string | null, id: string, name?: string | null, price?: number | null, updatedAt: any } | null> | null, user?: { __typename?: 'User', createdAt: any, email: string, id: string, name?: string | null, role?: Role | null, updatedAt: any } | null } | null> | null };

export type ProductById_QueryQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProductById_QueryQuery = { __typename?: 'Query', productById?: { __typename?: 'Product', createdAt: any, description?: string | null, id: string, name?: string | null, price?: number | null, updatedAt: any, category?: { __typename?: 'Category', createdAt: any, id: string, name?: string | null, updatedAt: any } | null, orders?: Array<{ __typename?: 'Order', createdAt: any, id: string, state?: string | null, updatedAt: any } | null> | null } | null };

export type Products_QueryQueryVariables = Exact<{
  orderBy?: InputMaybe<Scalars['JSON']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
}>;


export type Products_QueryQuery = { __typename?: 'Query', products?: Array<{ __typename?: 'Product', createdAt: any, description?: string | null, id: string, name?: string | null, price?: number | null, updatedAt: any, category?: { __typename?: 'Category', createdAt: any, id: string, name?: string | null, updatedAt: any } | null, orders?: Array<{ __typename?: 'Order', createdAt: any, id: string, state?: string | null, updatedAt: any } | null> | null } | null> | null };

export type Qcms_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type Qcms_QueryQuery = { __typename?: 'Query', qcms?: { __typename?: 'CmsInfo', schema?: any | null } | null };

export type UserById_QueryQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserById_QueryQuery = { __typename?: 'Query', userById?: { __typename?: 'User', createdAt: any, email: string, id: string, name?: string | null, role?: Role | null, updatedAt: any, orders?: { __typename?: 'Order', createdAt: any, id: string, state?: string | null, updatedAt: any } | null } | null };

export type Users_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type Users_QueryQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', createdAt: any, email: string, id: string, name?: string | null, role?: Role | null, updatedAt: any, orders?: { __typename?: 'Order', createdAt: any, id: string, state?: string | null, updatedAt: any } | null } | null> | null };

export type CreateCategory_MutationMutationVariables = Exact<{
  data?: InputMaybe<Scalars['JSON']>;
}>;


export type CreateCategory_MutationMutation = { __typename?: 'Mutation', createCategory?: { __typename?: 'Category', createdAt: any, id: string, name?: string | null, updatedAt: any, products?: Array<{ __typename?: 'Product', createdAt: any, description?: string | null, id: string, name?: string | null, price?: number | null, updatedAt: any } | null> | null } | null };

export type CreateOrder_MutationMutationVariables = Exact<{
  data?: InputMaybe<Scalars['JSON']>;
}>;


export type CreateOrder_MutationMutation = { __typename?: 'Mutation', createOrder?: { __typename?: 'Order', createdAt: any, id: string, state?: string | null, updatedAt: any, products?: Array<{ __typename?: 'Product', createdAt: any, description?: string | null, id: string, name?: string | null, price?: number | null, updatedAt: any } | null> | null, user?: { __typename?: 'User', createdAt: any, email: string, id: string, name?: string | null, role?: Role | null, updatedAt: any } | null } | null };

export type CreateProduct_MutationMutationVariables = Exact<{
  data?: InputMaybe<Scalars['JSON']>;
}>;


export type CreateProduct_MutationMutation = { __typename?: 'Mutation', createProduct?: { __typename?: 'Product', createdAt: any, description?: string | null, id: string, name?: string | null, price?: number | null, updatedAt: any, category?: { __typename?: 'Category', createdAt: any, id: string, name?: string | null, updatedAt: any } | null, orders?: Array<{ __typename?: 'Order', createdAt: any, id: string, state?: string | null, updatedAt: any } | null> | null } | null };

export type CreateUser_MutationMutationVariables = Exact<{
  data?: InputMaybe<Scalars['JSON']>;
}>;


export type CreateUser_MutationMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', createdAt: any, email: string, id: string, name?: string | null, role?: Role | null, updatedAt: any, orders?: { __typename?: 'Order', createdAt: any, id: string, state?: string | null, updatedAt: any } | null } | null };

export type DeleteCategory_MutationMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteCategory_MutationMutation = { __typename?: 'Mutation', deleteCategory?: { __typename?: 'Category', createdAt: any, id: string, name?: string | null, updatedAt: any, products?: Array<{ __typename?: 'Product', createdAt: any, description?: string | null, id: string, name?: string | null, price?: number | null, updatedAt: any } | null> | null } | null };

export type DeleteOrder_MutationMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteOrder_MutationMutation = { __typename?: 'Mutation', deleteOrder?: { __typename?: 'Order', createdAt: any, id: string, state?: string | null, updatedAt: any, products?: Array<{ __typename?: 'Product', createdAt: any, description?: string | null, id: string, name?: string | null, price?: number | null, updatedAt: any } | null> | null, user?: { __typename?: 'User', createdAt: any, email: string, id: string, name?: string | null, role?: Role | null, updatedAt: any } | null } | null };

export type DeleteProduct_MutationMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteProduct_MutationMutation = { __typename?: 'Mutation', deleteProduct?: { __typename?: 'Product', createdAt: any, description?: string | null, id: string, name?: string | null, price?: number | null, updatedAt: any, category?: { __typename?: 'Category', createdAt: any, id: string, name?: string | null, updatedAt: any } | null, orders?: Array<{ __typename?: 'Order', createdAt: any, id: string, state?: string | null, updatedAt: any } | null> | null } | null };

export type DeleteUser_MutationMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteUser_MutationMutation = { __typename?: 'Mutation', deleteUser?: { __typename?: 'User', createdAt: any, email: string, id: string, name?: string | null, role?: Role | null, updatedAt: any, orders?: { __typename?: 'Order', createdAt: any, id: string, state?: string | null, updatedAt: any } | null } | null };

export type LogInUser_MutationMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LogInUser_MutationMutation = { __typename?: 'Mutation', logInUser?: { __typename?: 'AuthResponse', jwt: string } | null };

export type LogOutUser_MutationMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutUser_MutationMutation = { __typename?: 'Mutation', logOutUser?: any | null };

export type RegisterUser_MutationMutationVariables = Exact<{
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
}>;


export type RegisterUser_MutationMutation = { __typename?: 'Mutation', registerUser?: { __typename?: 'AuthResponse', jwt: string } | null };

export type UpdateCategory_MutationMutationVariables = Exact<{
  data?: InputMaybe<Scalars['JSON']>;
  id: Scalars['String'];
}>;


export type UpdateCategory_MutationMutation = { __typename?: 'Mutation', updateCategory?: { __typename?: 'Category', createdAt: any, id: string, name?: string | null, updatedAt: any, products?: Array<{ __typename?: 'Product', createdAt: any, description?: string | null, id: string, name?: string | null, price?: number | null, updatedAt: any } | null> | null } | null };

export type UpdateOrder_MutationMutationVariables = Exact<{
  data?: InputMaybe<Scalars['JSON']>;
  id: Scalars['String'];
}>;


export type UpdateOrder_MutationMutation = { __typename?: 'Mutation', updateOrder?: { __typename?: 'Order', createdAt: any, id: string, state?: string | null, updatedAt: any, products?: Array<{ __typename?: 'Product', createdAt: any, description?: string | null, id: string, name?: string | null, price?: number | null, updatedAt: any } | null> | null, user?: { __typename?: 'User', createdAt: any, email: string, id: string, name?: string | null, role?: Role | null, updatedAt: any } | null } | null };

export type UpdateProduct_MutationMutationVariables = Exact<{
  data?: InputMaybe<Scalars['JSON']>;
  id: Scalars['String'];
}>;


export type UpdateProduct_MutationMutation = { __typename?: 'Mutation', updateProduct?: { __typename?: 'Product', createdAt: any, description?: string | null, id: string, name?: string | null, price?: number | null, updatedAt: any, category?: { __typename?: 'Category', createdAt: any, id: string, name?: string | null, updatedAt: any } | null, orders?: Array<{ __typename?: 'Order', createdAt: any, id: string, state?: string | null, updatedAt: any } | null> | null } | null };

export type UpdateUser_MutationMutationVariables = Exact<{
  data?: InputMaybe<Scalars['JSON']>;
  id: Scalars['String'];
}>;


export type UpdateUser_MutationMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', createdAt: any, email: string, id: string, name?: string | null, role?: Role | null, updatedAt: any, orders?: { __typename?: 'Order', createdAt: any, id: string, state?: string | null, updatedAt: any } | null } | null };


export const Categories_QueryDocument = gql`
    query categories_query($orderBy: JSON, $skip: Int, $take: Int, $where: JSON) {
  categories(orderBy: $orderBy, skip: $skip, take: $take, where: $where) {
    createdAt
    id
    name
    products {
      createdAt
      description
      id
      name
      price
      updatedAt
    }
    updatedAt
  }
}
    `;
export const CategoryById_QueryDocument = gql`
    query categoryById_query($id: String!) {
  categoryById(id: $id) {
    createdAt
    id
    name
    products {
      createdAt
      description
      id
      name
      price
      updatedAt
    }
    updatedAt
  }
}
    `;
export const Me_QueryDocument = gql`
    query me_query {
  me {
    createdAt
    email
    id
    name
    orders {
      createdAt
      id
      state
      updatedAt
    }
    role
    updatedAt
  }
}
    `;
export const OrderById_QueryDocument = gql`
    query orderById_query($id: String!) {
  orderById(id: $id) {
    createdAt
    id
    products {
      createdAt
      description
      id
      name
      price
      updatedAt
    }
    state
    updatedAt
    user {
      createdAt
      email
      id
      name
      role
      updatedAt
    }
  }
}
    `;
export const Orders_QueryDocument = gql`
    query orders_query($orderBy: JSON, $skip: Int, $take: Int, $where: JSON) {
  orders(orderBy: $orderBy, skip: $skip, take: $take, where: $where) {
    createdAt
    id
    products {
      createdAt
      description
      id
      name
      price
      updatedAt
    }
    state
    updatedAt
    user {
      createdAt
      email
      id
      name
      role
      updatedAt
    }
  }
}
    `;
export const ProductById_QueryDocument = gql`
    query productById_query($id: String!) {
  productById(id: $id) {
    category {
      createdAt
      id
      name
      updatedAt
    }
    createdAt
    description
    id
    name
    orders {
      createdAt
      id
      state
      updatedAt
    }
    price
    updatedAt
  }
}
    `;
export const Products_QueryDocument = gql`
    query products_query($orderBy: JSON, $skip: Int, $take: Int, $where: JSON) {
  products(orderBy: $orderBy, skip: $skip, take: $take, where: $where) {
    category {
      createdAt
      id
      name
      updatedAt
    }
    createdAt
    description
    id
    name
    orders {
      createdAt
      id
      state
      updatedAt
    }
    price
    updatedAt
  }
}
    `;
export const Qcms_QueryDocument = gql`
    query qcms_query {
  qcms {
    schema
  }
}
    `;
export const UserById_QueryDocument = gql`
    query userById_query($id: String!) {
  userById(id: $id) {
    createdAt
    email
    id
    name
    orders {
      createdAt
      id
      state
      updatedAt
    }
    role
    updatedAt
  }
}
    `;
export const Users_QueryDocument = gql`
    query users_query {
  users {
    createdAt
    email
    id
    name
    orders {
      createdAt
      id
      state
      updatedAt
    }
    role
    updatedAt
  }
}
    `;
export const CreateCategory_MutationDocument = gql`
    mutation createCategory_mutation($data: JSON) {
  createCategory(data: $data) {
    createdAt
    id
    name
    products {
      createdAt
      description
      id
      name
      price
      updatedAt
    }
    updatedAt
  }
}
    `;
export const CreateOrder_MutationDocument = gql`
    mutation createOrder_mutation($data: JSON) {
  createOrder(data: $data) {
    createdAt
    id
    products {
      createdAt
      description
      id
      name
      price
      updatedAt
    }
    state
    updatedAt
    user {
      createdAt
      email
      id
      name
      role
      updatedAt
    }
  }
}
    `;
export const CreateProduct_MutationDocument = gql`
    mutation createProduct_mutation($data: JSON) {
  createProduct(data: $data) {
    category {
      createdAt
      id
      name
      updatedAt
    }
    createdAt
    description
    id
    name
    orders {
      createdAt
      id
      state
      updatedAt
    }
    price
    updatedAt
  }
}
    `;
export const CreateUser_MutationDocument = gql`
    mutation createUser_mutation($data: JSON) {
  createUser(data: $data) {
    createdAt
    email
    id
    name
    orders {
      createdAt
      id
      state
      updatedAt
    }
    role
    updatedAt
  }
}
    `;
export const DeleteCategory_MutationDocument = gql`
    mutation deleteCategory_mutation($id: String!) {
  deleteCategory(id: $id) {
    createdAt
    id
    name
    products {
      createdAt
      description
      id
      name
      price
      updatedAt
    }
    updatedAt
  }
}
    `;
export const DeleteOrder_MutationDocument = gql`
    mutation deleteOrder_mutation($id: String!) {
  deleteOrder(id: $id) {
    createdAt
    id
    products {
      createdAt
      description
      id
      name
      price
      updatedAt
    }
    state
    updatedAt
    user {
      createdAt
      email
      id
      name
      role
      updatedAt
    }
  }
}
    `;
export const DeleteProduct_MutationDocument = gql`
    mutation deleteProduct_mutation($id: String!) {
  deleteProduct(id: $id) {
    category {
      createdAt
      id
      name
      updatedAt
    }
    createdAt
    description
    id
    name
    orders {
      createdAt
      id
      state
      updatedAt
    }
    price
    updatedAt
  }
}
    `;
export const DeleteUser_MutationDocument = gql`
    mutation deleteUser_mutation($id: String!) {
  deleteUser(id: $id) {
    createdAt
    email
    id
    name
    orders {
      createdAt
      id
      state
      updatedAt
    }
    role
    updatedAt
  }
}
    `;
export const LogInUser_MutationDocument = gql`
    mutation logInUser_mutation($email: String!, $password: String!) {
  logInUser(email: $email, password: $password) {
    jwt
  }
}
    `;
export const LogOutUser_MutationDocument = gql`
    mutation logOutUser_mutation {
  logOutUser
}
    `;
export const RegisterUser_MutationDocument = gql`
    mutation registerUser_mutation($email: String!, $name: String, $password: String!) {
  registerUser(email: $email, name: $name, password: $password) {
    jwt
  }
}
    `;
export const UpdateCategory_MutationDocument = gql`
    mutation updateCategory_mutation($data: JSON, $id: String!) {
  updateCategory(data: $data, id: $id) {
    createdAt
    id
    name
    products {
      createdAt
      description
      id
      name
      price
      updatedAt
    }
    updatedAt
  }
}
    `;
export const UpdateOrder_MutationDocument = gql`
    mutation updateOrder_mutation($data: JSON, $id: String!) {
  updateOrder(data: $data, id: $id) {
    createdAt
    id
    products {
      createdAt
      description
      id
      name
      price
      updatedAt
    }
    state
    updatedAt
    user {
      createdAt
      email
      id
      name
      role
      updatedAt
    }
  }
}
    `;
export const UpdateProduct_MutationDocument = gql`
    mutation updateProduct_mutation($data: JSON, $id: String!) {
  updateProduct(data: $data, id: $id) {
    category {
      createdAt
      id
      name
      updatedAt
    }
    createdAt
    description
    id
    name
    orders {
      createdAt
      id
      state
      updatedAt
    }
    price
    updatedAt
  }
}
    `;
export const UpdateUser_MutationDocument = gql`
    mutation updateUser_mutation($data: JSON, $id: String!) {
  updateUser(data: $data, id: $id) {
    createdAt
    email
    id
    name
    orders {
      createdAt
      id
      state
      updatedAt
    }
    role
    updatedAt
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    categories_query(variables?: Categories_QueryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Categories_QueryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Categories_QueryQuery>(Categories_QueryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'categories_query');
    },
    categoryById_query(variables: CategoryById_QueryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CategoryById_QueryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CategoryById_QueryQuery>(CategoryById_QueryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'categoryById_query');
    },
    me_query(variables?: Me_QueryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Me_QueryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Me_QueryQuery>(Me_QueryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'me_query');
    },
    orderById_query(variables: OrderById_QueryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<OrderById_QueryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<OrderById_QueryQuery>(OrderById_QueryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'orderById_query');
    },
    orders_query(variables?: Orders_QueryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Orders_QueryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Orders_QueryQuery>(Orders_QueryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'orders_query');
    },
    productById_query(variables: ProductById_QueryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ProductById_QueryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProductById_QueryQuery>(ProductById_QueryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'productById_query');
    },
    products_query(variables?: Products_QueryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Products_QueryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Products_QueryQuery>(Products_QueryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'products_query');
    },
    qcms_query(variables?: Qcms_QueryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Qcms_QueryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Qcms_QueryQuery>(Qcms_QueryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'qcms_query');
    },
    userById_query(variables: UserById_QueryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UserById_QueryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserById_QueryQuery>(UserById_QueryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'userById_query');
    },
    users_query(variables?: Users_QueryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Users_QueryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Users_QueryQuery>(Users_QueryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'users_query');
    },
    createCategory_mutation(variables?: CreateCategory_MutationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateCategory_MutationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateCategory_MutationMutation>(CreateCategory_MutationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createCategory_mutation');
    },
    createOrder_mutation(variables?: CreateOrder_MutationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateOrder_MutationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateOrder_MutationMutation>(CreateOrder_MutationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createOrder_mutation');
    },
    createProduct_mutation(variables?: CreateProduct_MutationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateProduct_MutationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateProduct_MutationMutation>(CreateProduct_MutationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createProduct_mutation');
    },
    createUser_mutation(variables?: CreateUser_MutationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateUser_MutationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUser_MutationMutation>(CreateUser_MutationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createUser_mutation');
    },
    deleteCategory_mutation(variables: DeleteCategory_MutationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteCategory_MutationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteCategory_MutationMutation>(DeleteCategory_MutationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteCategory_mutation');
    },
    deleteOrder_mutation(variables: DeleteOrder_MutationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteOrder_MutationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteOrder_MutationMutation>(DeleteOrder_MutationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteOrder_mutation');
    },
    deleteProduct_mutation(variables: DeleteProduct_MutationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteProduct_MutationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteProduct_MutationMutation>(DeleteProduct_MutationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteProduct_mutation');
    },
    deleteUser_mutation(variables: DeleteUser_MutationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteUser_MutationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteUser_MutationMutation>(DeleteUser_MutationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteUser_mutation');
    },
    logInUser_mutation(variables: LogInUser_MutationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LogInUser_MutationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LogInUser_MutationMutation>(LogInUser_MutationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'logInUser_mutation');
    },
    logOutUser_mutation(variables?: LogOutUser_MutationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LogOutUser_MutationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LogOutUser_MutationMutation>(LogOutUser_MutationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'logOutUser_mutation');
    },
    registerUser_mutation(variables: RegisterUser_MutationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RegisterUser_MutationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegisterUser_MutationMutation>(RegisterUser_MutationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'registerUser_mutation');
    },
    updateCategory_mutation(variables: UpdateCategory_MutationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateCategory_MutationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateCategory_MutationMutation>(UpdateCategory_MutationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateCategory_mutation');
    },
    updateOrder_mutation(variables: UpdateOrder_MutationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateOrder_MutationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateOrder_MutationMutation>(UpdateOrder_MutationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateOrder_mutation');
    },
    updateProduct_mutation(variables: UpdateProduct_MutationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateProduct_MutationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateProduct_MutationMutation>(UpdateProduct_MutationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateProduct_mutation');
    },
    updateUser_mutation(variables: UpdateUser_MutationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateUser_MutationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateUser_MutationMutation>(UpdateUser_MutationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateUser_mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export function getSdkWithHooks(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  const sdk = getSdk(client, withWrapper);
  return {
    ...sdk,
    useCategoriesQuery(key: SWRKeyInterface, variables?: Categories_QueryQueryVariables, config?: SWRConfigInterface<Categories_QueryQuery, ClientError>) {
      return useSWR<Categories_QueryQuery, ClientError>(key, () => sdk.categories_query(variables), config);
    },
    useCategoryByIdQuery(key: SWRKeyInterface, variables: CategoryById_QueryQueryVariables, config?: SWRConfigInterface<CategoryById_QueryQuery, ClientError>) {
      return useSWR<CategoryById_QueryQuery, ClientError>(key, () => sdk.categoryById_query(variables), config);
    },
    useMeQuery(key: SWRKeyInterface, variables?: Me_QueryQueryVariables, config?: SWRConfigInterface<Me_QueryQuery, ClientError>) {
      return useSWR<Me_QueryQuery, ClientError>(key, () => sdk.me_query(variables), config);
    },
    useOrderByIdQuery(key: SWRKeyInterface, variables: OrderById_QueryQueryVariables, config?: SWRConfigInterface<OrderById_QueryQuery, ClientError>) {
      return useSWR<OrderById_QueryQuery, ClientError>(key, () => sdk.orderById_query(variables), config);
    },
    useOrdersQuery(key: SWRKeyInterface, variables?: Orders_QueryQueryVariables, config?: SWRConfigInterface<Orders_QueryQuery, ClientError>) {
      return useSWR<Orders_QueryQuery, ClientError>(key, () => sdk.orders_query(variables), config);
    },
    useProductByIdQuery(key: SWRKeyInterface, variables: ProductById_QueryQueryVariables, config?: SWRConfigInterface<ProductById_QueryQuery, ClientError>) {
      return useSWR<ProductById_QueryQuery, ClientError>(key, () => sdk.productById_query(variables), config);
    },
    useProductsQuery(key: SWRKeyInterface, variables?: Products_QueryQueryVariables, config?: SWRConfigInterface<Products_QueryQuery, ClientError>) {
      return useSWR<Products_QueryQuery, ClientError>(key, () => sdk.products_query(variables), config);
    },
    useQcmsQuery(key: SWRKeyInterface, variables?: Qcms_QueryQueryVariables, config?: SWRConfigInterface<Qcms_QueryQuery, ClientError>) {
      return useSWR<Qcms_QueryQuery, ClientError>(key, () => sdk.qcms_query(variables), config);
    },
    useUserByIdQuery(key: SWRKeyInterface, variables: UserById_QueryQueryVariables, config?: SWRConfigInterface<UserById_QueryQuery, ClientError>) {
      return useSWR<UserById_QueryQuery, ClientError>(key, () => sdk.userById_query(variables), config);
    },
    useUsersQuery(key: SWRKeyInterface, variables?: Users_QueryQueryVariables, config?: SWRConfigInterface<Users_QueryQuery, ClientError>) {
      return useSWR<Users_QueryQuery, ClientError>(key, () => sdk.users_query(variables), config);
    }
  };
}
export type SdkWithHooks = ReturnType<typeof getSdkWithHooks>;