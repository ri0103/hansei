require 'bundler/setup'
Bundler.require

ActiveRecord::Base.establish_connection

class User < ActiveRecord::Base
    has_secure_password
    validates :userid,
    presence: true,
    format: { with: /\A\w+\z/ }
    validates :password,
    format: { with: /\A\w+\z/ }
    has_many :posts
    has_many :likes
    has_many :dislikes
    has_many :like_items, through: :likes, source: :post
    has_many :dislike_items, through: :dislikes, source: :post

end

class Post < ActiveRecord::Base
    has_many :likes
    has_many :dislikes
    has_many :like_users, through: :likes, source: :user
    has_many :dislike_users, through: :dislikes, source: :user
    belongs_to :user
end

class Like < ActiveRecord::Base
    belongs_to :user
    belongs_to :item
end

class Dislike < ActiveRecord::Base
    belongs_to :user
    belongs_to :item
end