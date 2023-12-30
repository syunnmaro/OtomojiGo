package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// Block holds the schema definition for the Block entity.
type Block struct {
	ent.Schema
}

// Fields of the Block.
func (Block) Fields() []ent.Field {
	return []ent.Field{
		field.String("id").DefaultFunc(func() string {
			return uuid.New().String()
		}).Unique(),
		field.String("author_id").Default(""),
		field.Float("speed").Default(1),
		field.String("speaker").Default("1"),
		field.Float("volume").Default(50),
		field.Int("pitch").Default(1),
		field.String("texts").Default(""),
		field.Int("duration").Default(0),
		field.String("part_id").Unique(),
	}
}

// Edges of the Block.
func (Block) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("part", Part.Type).
			Ref("blocks").
			Required().
			Unique().
			Field("part_id"),
	}
}
func (Block) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.QueryField(),
		entgql.Mutations(entgql.MutationCreate(), entgql.MutationUpdate()),
	}
}
