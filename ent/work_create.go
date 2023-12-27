// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"graphql-test-api/ent/part"
	"graphql-test-api/ent/user"
	"graphql-test-api/ent/work"
	"time"

	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// WorkCreate is the builder for creating a Work entity.
type WorkCreate struct {
	config
	mutation *WorkMutation
	hooks    []Hook
}

// SetName sets the "name" field.
func (wc *WorkCreate) SetName(s string) *WorkCreate {
	wc.mutation.SetName(s)
	return wc
}

// SetNillableName sets the "name" field if the given value is not nil.
func (wc *WorkCreate) SetNillableName(s *string) *WorkCreate {
	if s != nil {
		wc.SetName(*s)
	}
	return wc
}

// SetCreatedAt sets the "created_at" field.
func (wc *WorkCreate) SetCreatedAt(t time.Time) *WorkCreate {
	wc.mutation.SetCreatedAt(t)
	return wc
}

// SetNillableCreatedAt sets the "created_at" field if the given value is not nil.
func (wc *WorkCreate) SetNillableCreatedAt(t *time.Time) *WorkCreate {
	if t != nil {
		wc.SetCreatedAt(*t)
	}
	return wc
}

// SetAuthorID sets the "author_id" field.
func (wc *WorkCreate) SetAuthorID(s string) *WorkCreate {
	wc.mutation.SetAuthorID(s)
	return wc
}

// SetID sets the "id" field.
func (wc *WorkCreate) SetID(s string) *WorkCreate {
	wc.mutation.SetID(s)
	return wc
}

// SetNillableID sets the "id" field if the given value is not nil.
func (wc *WorkCreate) SetNillableID(s *string) *WorkCreate {
	if s != nil {
		wc.SetID(*s)
	}
	return wc
}

// SetAuthor sets the "author" edge to the User entity.
func (wc *WorkCreate) SetAuthor(u *User) *WorkCreate {
	return wc.SetAuthorID(u.ID)
}

// AddPartIDs adds the "parts" edge to the Part entity by IDs.
func (wc *WorkCreate) AddPartIDs(ids ...string) *WorkCreate {
	wc.mutation.AddPartIDs(ids...)
	return wc
}

// AddParts adds the "parts" edges to the Part entity.
func (wc *WorkCreate) AddParts(p ...*Part) *WorkCreate {
	ids := make([]string, len(p))
	for i := range p {
		ids[i] = p[i].ID
	}
	return wc.AddPartIDs(ids...)
}

// Mutation returns the WorkMutation object of the builder.
func (wc *WorkCreate) Mutation() *WorkMutation {
	return wc.mutation
}

// Save creates the Work in the database.
func (wc *WorkCreate) Save(ctx context.Context) (*Work, error) {
	wc.defaults()
	return withHooks(ctx, wc.sqlSave, wc.mutation, wc.hooks)
}

// SaveX calls Save and panics if Save returns an error.
func (wc *WorkCreate) SaveX(ctx context.Context) *Work {
	v, err := wc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (wc *WorkCreate) Exec(ctx context.Context) error {
	_, err := wc.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (wc *WorkCreate) ExecX(ctx context.Context) {
	if err := wc.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (wc *WorkCreate) defaults() {
	if _, ok := wc.mutation.Name(); !ok {
		v := work.DefaultName
		wc.mutation.SetName(v)
	}
	if _, ok := wc.mutation.CreatedAt(); !ok {
		v := work.DefaultCreatedAt
		wc.mutation.SetCreatedAt(v)
	}
	if _, ok := wc.mutation.ID(); !ok {
		v := work.DefaultID()
		wc.mutation.SetID(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (wc *WorkCreate) check() error {
	if _, ok := wc.mutation.Name(); !ok {
		return &ValidationError{Name: "name", err: errors.New(`ent: missing required field "Work.name"`)}
	}
	if _, ok := wc.mutation.CreatedAt(); !ok {
		return &ValidationError{Name: "created_at", err: errors.New(`ent: missing required field "Work.created_at"`)}
	}
	if _, ok := wc.mutation.AuthorID(); !ok {
		return &ValidationError{Name: "author_id", err: errors.New(`ent: missing required field "Work.author_id"`)}
	}
	if _, ok := wc.mutation.AuthorID(); !ok {
		return &ValidationError{Name: "author", err: errors.New(`ent: missing required edge "Work.author"`)}
	}
	return nil
}

func (wc *WorkCreate) sqlSave(ctx context.Context) (*Work, error) {
	if err := wc.check(); err != nil {
		return nil, err
	}
	_node, _spec := wc.createSpec()
	if err := sqlgraph.CreateNode(ctx, wc.driver, _spec); err != nil {
		if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	if _spec.ID.Value != nil {
		if id, ok := _spec.ID.Value.(string); ok {
			_node.ID = id
		} else {
			return nil, fmt.Errorf("unexpected Work.ID type: %T", _spec.ID.Value)
		}
	}
	wc.mutation.id = &_node.ID
	wc.mutation.done = true
	return _node, nil
}

func (wc *WorkCreate) createSpec() (*Work, *sqlgraph.CreateSpec) {
	var (
		_node = &Work{config: wc.config}
		_spec = sqlgraph.NewCreateSpec(work.Table, sqlgraph.NewFieldSpec(work.FieldID, field.TypeString))
	)
	if id, ok := wc.mutation.ID(); ok {
		_node.ID = id
		_spec.ID.Value = id
	}
	if value, ok := wc.mutation.Name(); ok {
		_spec.SetField(work.FieldName, field.TypeString, value)
		_node.Name = value
	}
	if value, ok := wc.mutation.CreatedAt(); ok {
		_spec.SetField(work.FieldCreatedAt, field.TypeTime, value)
		_node.CreatedAt = value
	}
	if nodes := wc.mutation.AuthorIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   work.AuthorTable,
			Columns: []string{work.AuthorColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(user.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_node.AuthorID = nodes[0]
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := wc.mutation.PartsIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   work.PartsTable,
			Columns: []string{work.PartsColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(part.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	return _node, _spec
}

// WorkCreateBulk is the builder for creating many Work entities in bulk.
type WorkCreateBulk struct {
	config
	err      error
	builders []*WorkCreate
}

// Save creates the Work entities in the database.
func (wcb *WorkCreateBulk) Save(ctx context.Context) ([]*Work, error) {
	if wcb.err != nil {
		return nil, wcb.err
	}
	specs := make([]*sqlgraph.CreateSpec, len(wcb.builders))
	nodes := make([]*Work, len(wcb.builders))
	mutators := make([]Mutator, len(wcb.builders))
	for i := range wcb.builders {
		func(i int, root context.Context) {
			builder := wcb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*WorkMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				if err := builder.check(); err != nil {
					return nil, err
				}
				builder.mutation = mutation
				var err error
				nodes[i], specs[i] = builder.createSpec()
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, wcb.builders[i+1].mutation)
				} else {
					spec := &sqlgraph.BatchCreateSpec{Nodes: specs}
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, wcb.driver, spec); err != nil {
						if sqlgraph.IsConstraintError(err) {
							err = &ConstraintError{msg: err.Error(), wrap: err}
						}
					}
				}
				if err != nil {
					return nil, err
				}
				mutation.id = &nodes[i].ID
				mutation.done = true
				return nodes[i], nil
			})
			for i := len(builder.hooks) - 1; i >= 0; i-- {
				mut = builder.hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if len(mutators) > 0 {
		if _, err := mutators[0].Mutate(ctx, wcb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX is like Save, but panics if an error occurs.
func (wcb *WorkCreateBulk) SaveX(ctx context.Context) []*Work {
	v, err := wcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (wcb *WorkCreateBulk) Exec(ctx context.Context) error {
	_, err := wcb.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (wcb *WorkCreateBulk) ExecX(ctx context.Context) {
	if err := wcb.Exec(ctx); err != nil {
		panic(err)
	}
}
