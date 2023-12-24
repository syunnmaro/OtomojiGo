// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"graphql-test-api/ent/block"
	"graphql-test-api/ent/part"
	"graphql-test-api/ent/user"
	"graphql-test-api/ent/work"

	"entgo.io/ent/dialect/sql"
	"github.com/99designs/gqlgen/graphql"
)

// CollectFields tells the query-builder to eagerly load connected nodes by resolver context.
func (b *BlockQuery) CollectFields(ctx context.Context, satisfies ...string) (*BlockQuery, error) {
	fc := graphql.GetFieldContext(ctx)
	if fc == nil {
		return b, nil
	}
	if err := b.collectField(ctx, graphql.GetOperationContext(ctx), fc.Field, nil, satisfies...); err != nil {
		return nil, err
	}
	return b, nil
}

func (b *BlockQuery) collectField(ctx context.Context, opCtx *graphql.OperationContext, collected graphql.CollectedField, path []string, satisfies ...string) error {
	path = append([]string(nil), path...)
	var (
		unknownSeen    bool
		fieldSeen      = make(map[string]struct{}, len(block.Columns))
		selectedFields = []string{block.FieldID}
	)
	for _, field := range graphql.CollectFields(opCtx, collected.Selections, satisfies) {
		switch field.Name {
		case "part":
			var (
				alias = field.Alias
				path  = append(path, alias)
				query = (&PartClient{config: b.config}).Query()
			)
			if err := query.collectField(ctx, opCtx, field, path, satisfies...); err != nil {
				return err
			}
			b.withPart = query
			if _, ok := fieldSeen[block.FieldPartID]; !ok {
				selectedFields = append(selectedFields, block.FieldPartID)
				fieldSeen[block.FieldPartID] = struct{}{}
			}
		case "authorID":
			if _, ok := fieldSeen[block.FieldAuthorID]; !ok {
				selectedFields = append(selectedFields, block.FieldAuthorID)
				fieldSeen[block.FieldAuthorID] = struct{}{}
			}
		case "speed":
			if _, ok := fieldSeen[block.FieldSpeed]; !ok {
				selectedFields = append(selectedFields, block.FieldSpeed)
				fieldSeen[block.FieldSpeed] = struct{}{}
			}
		case "speaker":
			if _, ok := fieldSeen[block.FieldSpeaker]; !ok {
				selectedFields = append(selectedFields, block.FieldSpeaker)
				fieldSeen[block.FieldSpeaker] = struct{}{}
			}
		case "volume":
			if _, ok := fieldSeen[block.FieldVolume]; !ok {
				selectedFields = append(selectedFields, block.FieldVolume)
				fieldSeen[block.FieldVolume] = struct{}{}
			}
		case "pitch":
			if _, ok := fieldSeen[block.FieldPitch]; !ok {
				selectedFields = append(selectedFields, block.FieldPitch)
				fieldSeen[block.FieldPitch] = struct{}{}
			}
		case "texts":
			if _, ok := fieldSeen[block.FieldTexts]; !ok {
				selectedFields = append(selectedFields, block.FieldTexts)
				fieldSeen[block.FieldTexts] = struct{}{}
			}
		case "duration":
			if _, ok := fieldSeen[block.FieldDuration]; !ok {
				selectedFields = append(selectedFields, block.FieldDuration)
				fieldSeen[block.FieldDuration] = struct{}{}
			}
		case "partID":
			if _, ok := fieldSeen[block.FieldPartID]; !ok {
				selectedFields = append(selectedFields, block.FieldPartID)
				fieldSeen[block.FieldPartID] = struct{}{}
			}
		case "id":
		case "__typename":
		default:
			unknownSeen = true
		}
	}
	if !unknownSeen {
		b.Select(selectedFields...)
	}
	return nil
}

type blockPaginateArgs struct {
	first, last   *int
	after, before *Cursor
	opts          []BlockPaginateOption
}

func newBlockPaginateArgs(rv map[string]any) *blockPaginateArgs {
	args := &blockPaginateArgs{}
	if rv == nil {
		return args
	}
	if v := rv[firstField]; v != nil {
		args.first = v.(*int)
	}
	if v := rv[lastField]; v != nil {
		args.last = v.(*int)
	}
	if v := rv[afterField]; v != nil {
		args.after = v.(*Cursor)
	}
	if v := rv[beforeField]; v != nil {
		args.before = v.(*Cursor)
	}
	if v, ok := rv[whereField].(*BlockWhereInput); ok {
		args.opts = append(args.opts, WithBlockFilter(v.Filter))
	}
	return args
}

// CollectFields tells the query-builder to eagerly load connected nodes by resolver context.
func (pa *PartQuery) CollectFields(ctx context.Context, satisfies ...string) (*PartQuery, error) {
	fc := graphql.GetFieldContext(ctx)
	if fc == nil {
		return pa, nil
	}
	if err := pa.collectField(ctx, graphql.GetOperationContext(ctx), fc.Field, nil, satisfies...); err != nil {
		return nil, err
	}
	return pa, nil
}

func (pa *PartQuery) collectField(ctx context.Context, opCtx *graphql.OperationContext, collected graphql.CollectedField, path []string, satisfies ...string) error {
	path = append([]string(nil), path...)
	var (
		unknownSeen    bool
		fieldSeen      = make(map[string]struct{}, len(part.Columns))
		selectedFields = []string{part.FieldID}
	)
	for _, field := range graphql.CollectFields(opCtx, collected.Selections, satisfies) {
		switch field.Name {
		case "work":
			var (
				alias = field.Alias
				path  = append(path, alias)
				query = (&WorkClient{config: pa.config}).Query()
			)
			if err := query.collectField(ctx, opCtx, field, path, satisfies...); err != nil {
				return err
			}
			pa.withWork = query
			if _, ok := fieldSeen[part.FieldWorkID]; !ok {
				selectedFields = append(selectedFields, part.FieldWorkID)
				fieldSeen[part.FieldWorkID] = struct{}{}
			}
		case "blocks":
			var (
				alias = field.Alias
				path  = append(path, alias)
				query = (&BlockClient{config: pa.config}).Query()
			)
			if err := query.collectField(ctx, opCtx, field, path, satisfies...); err != nil {
				return err
			}
			pa.WithNamedBlocks(alias, func(wq *BlockQuery) {
				*wq = *query
			})
		case "name":
			if _, ok := fieldSeen[part.FieldName]; !ok {
				selectedFields = append(selectedFields, part.FieldName)
				fieldSeen[part.FieldName] = struct{}{}
			}
		case "workID":
			if _, ok := fieldSeen[part.FieldWorkID]; !ok {
				selectedFields = append(selectedFields, part.FieldWorkID)
				fieldSeen[part.FieldWorkID] = struct{}{}
			}
		case "authorID":
			if _, ok := fieldSeen[part.FieldAuthorID]; !ok {
				selectedFields = append(selectedFields, part.FieldAuthorID)
				fieldSeen[part.FieldAuthorID] = struct{}{}
			}
		case "id":
		case "__typename":
		default:
			unknownSeen = true
		}
	}
	if !unknownSeen {
		pa.Select(selectedFields...)
	}
	return nil
}

type partPaginateArgs struct {
	first, last   *int
	after, before *Cursor
	opts          []PartPaginateOption
}

func newPartPaginateArgs(rv map[string]any) *partPaginateArgs {
	args := &partPaginateArgs{}
	if rv == nil {
		return args
	}
	if v := rv[firstField]; v != nil {
		args.first = v.(*int)
	}
	if v := rv[lastField]; v != nil {
		args.last = v.(*int)
	}
	if v := rv[afterField]; v != nil {
		args.after = v.(*Cursor)
	}
	if v := rv[beforeField]; v != nil {
		args.before = v.(*Cursor)
	}
	if v, ok := rv[whereField].(*PartWhereInput); ok {
		args.opts = append(args.opts, WithPartFilter(v.Filter))
	}
	return args
}

// CollectFields tells the query-builder to eagerly load connected nodes by resolver context.
func (u *UserQuery) CollectFields(ctx context.Context, satisfies ...string) (*UserQuery, error) {
	fc := graphql.GetFieldContext(ctx)
	if fc == nil {
		return u, nil
	}
	if err := u.collectField(ctx, graphql.GetOperationContext(ctx), fc.Field, nil, satisfies...); err != nil {
		return nil, err
	}
	return u, nil
}

func (u *UserQuery) collectField(ctx context.Context, opCtx *graphql.OperationContext, collected graphql.CollectedField, path []string, satisfies ...string) error {
	path = append([]string(nil), path...)
	var (
		unknownSeen    bool
		fieldSeen      = make(map[string]struct{}, len(user.Columns))
		selectedFields = []string{user.FieldID}
	)
	for _, field := range graphql.CollectFields(opCtx, collected.Selections, satisfies) {
		switch field.Name {
		case "works":
			var (
				alias = field.Alias
				path  = append(path, alias)
				query = (&WorkClient{config: u.config}).Query()
			)
			if err := query.collectField(ctx, opCtx, field, path, satisfies...); err != nil {
				return err
			}
			u.WithNamedWorks(alias, func(wq *WorkQuery) {
				*wq = *query
			})
		case "googleID":
			if _, ok := fieldSeen[user.FieldGoogleID]; !ok {
				selectedFields = append(selectedFields, user.FieldGoogleID)
				fieldSeen[user.FieldGoogleID] = struct{}{}
			}
		case "stripeID":
			if _, ok := fieldSeen[user.FieldStripeID]; !ok {
				selectedFields = append(selectedFields, user.FieldStripeID)
				fieldSeen[user.FieldStripeID] = struct{}{}
			}
		case "point":
			if _, ok := fieldSeen[user.FieldPoint]; !ok {
				selectedFields = append(selectedFields, user.FieldPoint)
				fieldSeen[user.FieldPoint] = struct{}{}
			}
		case "id":
		case "__typename":
		default:
			unknownSeen = true
		}
	}
	if !unknownSeen {
		u.Select(selectedFields...)
	}
	return nil
}

type userPaginateArgs struct {
	first, last   *int
	after, before *Cursor
	opts          []UserPaginateOption
}

func newUserPaginateArgs(rv map[string]any) *userPaginateArgs {
	args := &userPaginateArgs{}
	if rv == nil {
		return args
	}
	if v := rv[firstField]; v != nil {
		args.first = v.(*int)
	}
	if v := rv[lastField]; v != nil {
		args.last = v.(*int)
	}
	if v := rv[afterField]; v != nil {
		args.after = v.(*Cursor)
	}
	if v := rv[beforeField]; v != nil {
		args.before = v.(*Cursor)
	}
	if v, ok := rv[whereField].(*UserWhereInput); ok {
		args.opts = append(args.opts, WithUserFilter(v.Filter))
	}
	return args
}

// CollectFields tells the query-builder to eagerly load connected nodes by resolver context.
func (w *WorkQuery) CollectFields(ctx context.Context, satisfies ...string) (*WorkQuery, error) {
	fc := graphql.GetFieldContext(ctx)
	if fc == nil {
		return w, nil
	}
	if err := w.collectField(ctx, graphql.GetOperationContext(ctx), fc.Field, nil, satisfies...); err != nil {
		return nil, err
	}
	return w, nil
}

func (w *WorkQuery) collectField(ctx context.Context, opCtx *graphql.OperationContext, collected graphql.CollectedField, path []string, satisfies ...string) error {
	path = append([]string(nil), path...)
	var (
		unknownSeen    bool
		fieldSeen      = make(map[string]struct{}, len(work.Columns))
		selectedFields = []string{work.FieldID}
	)
	for _, field := range graphql.CollectFields(opCtx, collected.Selections, satisfies) {
		switch field.Name {
		case "author":
			var (
				alias = field.Alias
				path  = append(path, alias)
				query = (&UserClient{config: w.config}).Query()
			)
			if err := query.collectField(ctx, opCtx, field, path, satisfies...); err != nil {
				return err
			}
			w.withAuthor = query
			if _, ok := fieldSeen[work.FieldAuthorID]; !ok {
				selectedFields = append(selectedFields, work.FieldAuthorID)
				fieldSeen[work.FieldAuthorID] = struct{}{}
			}
		case "parts":
			var (
				alias = field.Alias
				path  = append(path, alias)
				query = (&PartClient{config: w.config}).Query()
			)
			if err := query.collectField(ctx, opCtx, field, path, satisfies...); err != nil {
				return err
			}
			w.WithNamedParts(alias, func(wq *PartQuery) {
				*wq = *query
			})
		case "name":
			if _, ok := fieldSeen[work.FieldName]; !ok {
				selectedFields = append(selectedFields, work.FieldName)
				fieldSeen[work.FieldName] = struct{}{}
			}
		case "createdAt":
			if _, ok := fieldSeen[work.FieldCreatedAt]; !ok {
				selectedFields = append(selectedFields, work.FieldCreatedAt)
				fieldSeen[work.FieldCreatedAt] = struct{}{}
			}
		case "authorID":
			if _, ok := fieldSeen[work.FieldAuthorID]; !ok {
				selectedFields = append(selectedFields, work.FieldAuthorID)
				fieldSeen[work.FieldAuthorID] = struct{}{}
			}
		case "id":
		case "__typename":
		default:
			unknownSeen = true
		}
	}
	if !unknownSeen {
		w.Select(selectedFields...)
	}
	return nil
}

type workPaginateArgs struct {
	first, last   *int
	after, before *Cursor
	opts          []WorkPaginateOption
}

func newWorkPaginateArgs(rv map[string]any) *workPaginateArgs {
	args := &workPaginateArgs{}
	if rv == nil {
		return args
	}
	if v := rv[firstField]; v != nil {
		args.first = v.(*int)
	}
	if v := rv[lastField]; v != nil {
		args.last = v.(*int)
	}
	if v := rv[afterField]; v != nil {
		args.after = v.(*Cursor)
	}
	if v := rv[beforeField]; v != nil {
		args.before = v.(*Cursor)
	}
	if v, ok := rv[whereField].(*WorkWhereInput); ok {
		args.opts = append(args.opts, WithWorkFilter(v.Filter))
	}
	return args
}

const (
	afterField     = "after"
	firstField     = "first"
	beforeField    = "before"
	lastField      = "last"
	orderByField   = "orderBy"
	directionField = "direction"
	fieldField     = "field"
	whereField     = "where"
)

func fieldArgs(ctx context.Context, whereInput any, path ...string) map[string]any {
	field := collectedField(ctx, path...)
	if field == nil || field.Arguments == nil {
		return nil
	}
	oc := graphql.GetOperationContext(ctx)
	args := field.ArgumentMap(oc.Variables)
	return unmarshalArgs(ctx, whereInput, args)
}

// unmarshalArgs allows extracting the field arguments from their raw representation.
func unmarshalArgs(ctx context.Context, whereInput any, args map[string]any) map[string]any {
	for _, k := range []string{firstField, lastField} {
		v, ok := args[k]
		if !ok {
			continue
		}
		i, err := graphql.UnmarshalInt(v)
		if err == nil {
			args[k] = &i
		}
	}
	for _, k := range []string{beforeField, afterField} {
		v, ok := args[k]
		if !ok {
			continue
		}
		c := &Cursor{}
		if c.UnmarshalGQL(v) == nil {
			args[k] = c
		}
	}
	if v, ok := args[whereField]; ok && whereInput != nil {
		if err := graphql.UnmarshalInputFromContext(ctx, v, whereInput); err == nil {
			args[whereField] = whereInput
		}
	}

	return args
}

func limitRows(partitionBy string, limit int, orderBy ...sql.Querier) func(s *sql.Selector) {
	return func(s *sql.Selector) {
		d := sql.Dialect(s.Dialect())
		s.SetDistinct(false)
		with := d.With("src_query").
			As(s.Clone()).
			With("limited_query").
			As(
				d.Select("*").
					AppendSelectExprAs(
						sql.RowNumber().PartitionBy(partitionBy).OrderExpr(orderBy...),
						"row_number",
					).
					From(d.Table("src_query")),
			)
		t := d.Table("limited_query").As(s.TableName())
		*s = *d.Select(s.UnqualifiedColumns()...).
			From(t).
			Where(sql.LTE(t.C("row_number"), limit)).
			Prefix(with)
	}
}

// mayAddCondition appends another type condition to the satisfies list
// if condition is enabled (Node/Nodes) and it does not exist in the list.
func mayAddCondition(satisfies []string, typeCond string) []string {
	if len(satisfies) == 0 {
		return satisfies
	}
	for _, s := range satisfies {
		if typeCond == s {
			return satisfies
		}
	}
	return append(satisfies, typeCond)
}
