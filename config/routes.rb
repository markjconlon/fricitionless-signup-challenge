Rails.application.routes.draw do
  root 'users#new'
  resources :users, only: [:new]
  get '/users/check_email/' => 'users#check_email'

end
